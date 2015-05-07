var express = require('express');
var router = express.Router();

var db = require('../../resources/db');
var registerInfo = require('../../resources/registerInfo.js');

/**
 * Register route. Is called when the device is registered.
 * Sets the device_token to used.
 */
router.get('/', function(req, res) {

    db.getAccessToken(function(token, used, err) {
        if (req.headers['networktoken'] == "") {
            //no networktoken was given
            var err = new Error();
            err.status = 500;
            err.message = 'error: no network token given';
            res.status(500).json(err);
        } else if (req.query.access_token != token) {
            //accesstoken is wrong
            var err = new Error();
            err.status = 401;
            err.message = 'error: register token is invalid';
            res.status(401).json(err);
        } else if (used == 1) {
            //thing is already registered
            var err = new Error();
            err.status = 423;
            err.message = 'error: device is already registered';
            res.status(423).json(err);
        } else {
            //registration successful
            db.setAccessTokenToUsed();
            db.setNetworkData(req.headers['networktoken']);
            res.json(registerInfo);
        }
    });
});

module.exports = router;