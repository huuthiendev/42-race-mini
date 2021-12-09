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
    console.log('[OauthController] stravaCallback - authorize info: ', info);

    // Add user credentials to session
    req.session.refreshToken = info.refresh_token;
    req.session.accessToken = info.access_token;
    req.session.expiresAt = info.expires_at;
    req.session.athleteId = info.athlete.id;

    var account = await Accounts.findOne({ athleteId: info.athlete.id });
    if (!account) {
      var { id, firstname, lastname, sex, profile } = info.athlete;
      account = await Accounts.create({ athleteId: id, firstname, lastname, sex, profile }).fetch();
      console.log('[OauthController] stravaCallback - register a new account: ', account);
    }

    // Fetch all activities
    var activities = await Strava.listAthleteActivities(info.access_token);
    // Sync activities
    await syncActivities(activities, account._id);

    return res.redirect('/');
  }
  catch (err) {
    console.log('[OauthController] stravaCallback - error: ', err);
    return res.badRequest(err);
  }
}

async function syncActivities(fetchActivites, accountId) {
  var existingActivities = await Activities.find({ accountId: accountId });
  var newActivities = fetchActivites.reduce((total, activity) => {
    var checkActivity = existingActivities.find(act => act.stravaActivityId == activity.id);
    if (!checkActivity) {
      var { athlete, name, distance, id, type, average_speed, start_date, moving_time, total_elevation_gain } = activity;
      total.push({
        athleteId: athlete.id,
        name,
        distance,
        stravaActivityId: id,
        type,
        averageSpeed: average_speed,
        startDate: start_date,
        accountId,
        movingTime: moving_time,
        totalElevationGain: total_elevation_gain
      });
    }
    return total;
  }, []);
  await Activities.createEach(newActivities);
}

async function disconnect(req, res) {
  try {
    await Strava.deauthorize(req.session.accessToken);
    req.session.destroy();
    res.redirect('/');
  }
  catch (err) {
    console.log('[OauthController] disconnect - error: ', err);
    return res.badRequest(err);
  }
}