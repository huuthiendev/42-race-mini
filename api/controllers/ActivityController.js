/**
 * ActivityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAccountActivities,
  getListActivities,
  getActivityById,
  deleteActivity
};

async function getAccountActivities(req, res) {
  try {
    var activities = await Activities.find({ athleteId: req.session.athleteId }).sort('createdAt desc');
    return res.ok(activities);
  }
  catch (err) {
    console.log('[ActivityController] getAccountActivities - error: ', err);
    return res.badRequest(err);
  }
}

async function getListActivities(req, res) {
  try {
    var criteria = Utils.buildCriteria(req.query, ['type', 'accountId'])
    var activities = await Activities.find(criteria).sort('createdAt desc');
    return res.ok(activities);
  }
  catch (err) {
    console.log('[ActivityController] getListActivities - error: ', err);
    return res.badRequest(err);
  }
}

async function getActivityById(req, res) {
  try {
    // Check require params
    Utils.checkRequestParams(req.query, ['id']);
    var id = req.query.id;

    var activity = await Activities.findOne({ id });
    return res.ok(activity ? activity : null);
  }
  catch (err) {
    console.log('[ActivityController] getActivityById - error: ', err);
    return res.badRequest(err);
  }
}

async function deleteActivity(req, res) {
  try {
    // Check require params
    Utils.checkRequestParams(req.query, ['id']);

    var activity = await Activities.findOne({ id: req.query.id });
    if (!activity) {
      throw { message: 'Invalid activity id' };
    }
    await Activities.destroy({ id: req.query.id });
    return res.ok(activity);
  }
  catch (err) {
    console.log('[ActivityController] deleteActivity - error: ', err);
    return res.badRequest(err);
  }
}