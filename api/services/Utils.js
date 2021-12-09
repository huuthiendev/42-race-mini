module.exports = {
  checkRequestParams
};

/**
 *
 * @param {Object} requestParams Parameters from request.
 * @param {string[]} requireParams List of required parameter
 */

function checkRequestParams(requestParams, requireParams) {
  var missingParams = [];
  requireParams.forEach(r => {
    if (!requestParams || !requestParams[r]) {
      missingParams.push(r);
    }
  });
  if (missingParams.length) {
    throw {
      message: 'Missing parameters: ' + missingParams.join(', ')
    };
  }
  else return;
}