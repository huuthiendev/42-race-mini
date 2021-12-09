/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  accountInfo,
  getListAccounts,
  getAccountInfoById
};

async function accountInfo(req, res) {
  try {
    var account = await Accounts.findOne({ athleteId: req.session.athleteId })
    return res.ok(account);
  }
  catch (err) {
    console.log('[AccountController] accountInfo - error: ', err);
    return res.badRequest(err);
  }
}

async function getListAccounts(req, res) {
  try {
    var accounts = await Accounts.find();
    return res.ok(accounts);
  }
  catch (err) {
    console.log('[AccountController] getListAccounts - error: ', err);
    return res.badRequest(err);
  }
}

async function getAccountInfoById(req, res) {
  try {
    // Check require params
    Utils.checkRequestParams(req.query, ['id']);
    var accountId = req.query.id;

    var account = await Accounts.findOne({ id: accountId });
    return res.ok(account ? account : null);
  }
  catch (err) {
    console.log('[AccountController] getAccountInfoById - error: ', err);
    return res.badRequest(err);
  }
}