/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  // OauthController
  'GET /oauth/connect': 'OauthController.connect',
  'GET /oauth/callback': 'OauthController.stravaCallback',
  'GET /oauth/disconnect': 'OauthController.disconnect',


  // ActivityController
  'GET /activity/get-by-account': 'ActivityController.getAccountActivities',
  'GET /activity/list': 'ActivityController.getListActivities',
  'GET /activity/get-activity': 'ActivityController.getActivityById',
  'DELETE /activity/delete': 'ActivityController.deleteActivity',

  // AccountController
  'GET /account/info': 'AccountController.accountInfo',
  'GET /account/list': 'AccountController.getListAccounts',
  'GET /account/get-by-id': 'AccountController.getAccountInfoById',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
