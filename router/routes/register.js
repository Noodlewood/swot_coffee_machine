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
        if(used != 1 && req.query.access_token == token && req.headers['networktoken'] != ""){
            db.setAccessTokenToUsed();
            db.setNetworkData(req.headers['networktoken']);
            res.json(registerInfo);
        }else{
            // a wrong parameter was sent
            var err = new Error();
            err.status = 500;
            err.message = 'Something went wrong';
            res.status(500).json(err);
        }

    });
});

module.exports = router;