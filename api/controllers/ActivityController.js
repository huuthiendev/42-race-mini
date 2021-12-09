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
    var activities = await Activities.find().sort('createdAt desc');
    return res.ok(activities);
  }
  catch (err) {
    console.log('[ActivityController] getListActivities - error: ', err);
    return res.badRequest(err);
  }
}

async function getActivityById(req, res) {
  try {
    var id = req.param('id');
    var activity = await Activities.findOne({ id });
    return res.ok(activity);
  }
  catch (err) {
    console.log('[ActivityController] getActivityById - error: ', err);
    return res.badRequest(err);
  }
}

async function deleteActivity(req, res) {
  try {
    var id = req.param('id');
    var activity = await Activities.destroy({ id });
    return res.ok(activity);
  }
  catch (err) {
    console.log('[ActivityController] deleteActivity - error: ', err);
    return res.badRequest(err);
  }
}