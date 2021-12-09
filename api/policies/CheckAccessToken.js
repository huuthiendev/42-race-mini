module.exports = async function (req, res, next) {
  if (!req.session.accessToken) {
    return res.status(401).send('Unauthorized');
  }
  var nowTime = new Date().getTime();
  if ((req.session.expiresAt * 1000) <= nowTime) {
    // Refreshing Expired Access Tokens
    var tokenInfo = await Strava.refreshExpiredAccessToken(req.session.refreshToken);
    req.session.refreshToken = tokenInfo.refresh_token;
    req.session.accessToken = tokenInfo.access_token;
    req.session.expiresAt = tokenInfo.expires_at;
  }
  next();
}