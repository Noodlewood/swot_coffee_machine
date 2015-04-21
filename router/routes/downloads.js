var express = require('express');
var fs = require('fs');
var router = express.Router();

var tokens = require('../../resources/tokens.js');

/**
 * Profile Image route. This routes gives access
 * to the profile image of the thing protoype.
 */
router.get('/:file(*)', function(req, res, next){
    if(req.headers['accesstoken'] == tokens.tokens.read_token){

        var file = req.params.file;
        var path = "./resources/" + file;
        var exists = fs.existsSync(path);

        if(!exists){
            var err = new Error();
            err.status = 404;
            err.message = 'Resource not found.';
            res.status(404).json(err);
        }else{
            res.download(path);
        }

    }else{
        var err = new Error();
        err.status = 403;
        err.message = 'You are not permitted to perform this.';
        res.status(403).json(err);
    }
});

module.exports = router;
