# 42-race-mini

## Setup
Install all dependencies
```bash
npm install
```
Update ENV (.env.example)
```
DB_HOST=<<Database Host>>
DB_PORT=<<Database Port>>
DB_USER=<<Database Username>>
DB_PASS=<<Database Password>>
DB_NAME=<<Database Name>>

STRAVA_CLIENT_ID=<<STRAVA CLIENT ID>>
STRAVA_CLIENT_SECRET=<<STRAVA CLIENT SECRET>>
CALLBACK_URL=<<REDIRECT PATH>>
```

Rename .env.example to .env

For the first run, we must use **—-alter** to generate collections in MongoDB.
```bash
sails lift --alter
```
Next times
```bash
sails lift

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Wed Dec 08 2021 20:44:54 GMT+0700 (Indochina Time) using Sails v1.5.0.

<!-- Internally, Sails used [`sails-generate@2.0.3`](https://github.com/balderdashy/sails-generate/tree/v2.0.3/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

