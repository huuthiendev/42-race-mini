module.exports = {
  checkRequestParams,
  buildCriteria
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

/**
 *
 * @param {Object} requestParams Parameters from request.
 * @param {string[]} fields List of query fields
 */
function buildCriteria(reqParams, fields) {
  var criteria = {};
  fields.forEach(field => {
    if (reqParams[field]) {
      criteria[field] = reqParams[field];
    }
  });
  return criteria;
}