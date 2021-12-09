/**
 * OauthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  connect,
  disconnect,
  stravaCallback,
  userInfo
};

async function connect(req, res) {
  try {
    if (!req.session.accessToken) {
      // Require strava authorization
      return res.redirect(Strava.getAuthorizeURL());
    }
    return res.redirect('/');
  }
  catch (err) {
    console.log('[OauthController] connect - error: ', err);
    return res.badRequest(err);
  }
}

async function stravaCallback(req, res) {
  try {
    var code = req.query.code;
    var info = await Strava.tokenExchange(code);
    console.log('Strava Info: ', info);
    // Add user credentials to session
    req.session.refreshToken = info.refresh_token;
    req.session.accessToken = info.access_token;
    req.session.expiresAt = info.expires_at;

    return res.redirect('/');
  }
  catch (err) {
    console.log('[OauthController] stravaCallback - error: ', err);
    return res.badRequest(err);
  }
}

async function disconnect(req, res) {
  try {
    req.session.destroy();
    res.redirect('/');
  }
  catch (err) {
    console.log('[OauthController] disconnect - error: ', err);
    return res.badRequest(err);
  }
}

async function userInfo(req, res) {
  try {
    var user = req.session.athleteId;
    console.log('User info: ', user);
    return res.ok(user);
  }
  catch (err) {
    console.log('[OauthController] userInfo - error: ', err);
    return res.badRequest(err);
  }
}