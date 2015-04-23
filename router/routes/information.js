var express = require('express');
var router = express.Router();

var db = require('../../resources/db.js');
var tokens = require('../../resources/tokens.js');
/**
 * Returns the device config as json object
 */
router.get('/', function(req, res) {

    db.getStatusInfo(function(status) {

        if(req.headers['accesstoken'] == tokens.tokens.read_token){
            res.json(status);
        }else{
            // a wrong parameter was sent
            var err = new Error();
            err.status = 403;
            err.message = 'You are not permitted to perform this.';
            res.status(403).json(err);
        }

    });
});

module.exports = router;
