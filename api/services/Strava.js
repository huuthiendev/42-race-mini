const axios = require('axios');

module.exports = {
  getAuthorizeURL,
  tokenExchange,
  refreshExpiredAccessToken,
  deauthorize
};

function getAuthorizeURL() {
  return `${sails.config.globals.STRAVA_API_ENDPOINT}oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${process.env.CALLBACK_URL}&approval_prompt=auto`
}

/**
 * Request Token Exchange
 * 
 * @param {string} code
 * @return {Object}
 */
async function tokenExchange(code) {
  try {
    var data = {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code'
    };
    var response = await axios({
      method: 'post',
      url: sails.config.globals.STRAVA_API_ENDPOINT + 'oauth/token',
      data
    });
    return response.data;
  }
  catch (err) {
    err = err.response.data;
    console.log('[Strava Service] tokenExchange - ERROR: ', err);
    throw err;
  }
}

/**
 * Request to Strava to get a new access token
 * 
 * @param {string} refreshToken
 * @return {Object}
 */
async function refreshExpiredAccessToken(refreshToken) {
  try {
    var data = {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    };
    var response = await axios({
      method: 'post',
      url: sails.config.globals.STRAVA_API_ENDPOINT + 'oauth/token',
      data
    });
    return response.data;
  }
  catch (err) {
    err = err.response.data;
    console.log('[Strava Service] refreshExpiredAccessToken - ERROR: ', err);
    throw err;
  }
}

/**
 * Request to Strava to revoke access token
 * 
 * @param {string} accessToken
 * @return {Object}
 */
async function deauthorize(accessToken) {
  try {
    var data = {
      access_token: accessToken
    };
    var response = await axios({
      method: 'post',
      url: sails.config.globals.STRAVA_API_ENDPOINT + 'oauth/deauthorize',
      data
    });
    return response.data;
  }
  catch (err) {
    err = err.response.data;
    console.log('[Strava Service] deauthorize - ERROR: ', err);
    throw err;
  }
}