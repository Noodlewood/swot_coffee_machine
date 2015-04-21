var express = require('express');
var router = express.Router();

var func = require('../../resources/functionsInfo.js');
var tokens = require('../../resources/tokens.js');

/**
 * Returns the device config as json object
 */
router.get('/', function(req, res) {
    if(req.headers['accesstoken'] == tokens.tokens.read_token){
        res.json(func);
    }else{
        var err = new Error();
        err.status = 403;
        err.message = 'You are not permitted to perform this.';
        res.status(403).json(err);
    }
});

module.exports = router;
