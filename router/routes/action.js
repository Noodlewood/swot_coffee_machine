require('../../resources/socketio.js');

var serverCom = require('../../resources/serverCommunication.js');
var express = require('express');
var router = express.Router();
var db = require('../../resources/db.js');
var tokens = require('../../resources/tokens.js');
var func = require('../../resources/functionsInfo.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('ACTION TIME');
});

router.get('/cook', function(req, res) {
        if (req.headers['accesstoken'] != tokens.tokens.owner_token && req.headers['accesstoken'] != tokens.tokens.write_token) {
            var err = new Error();
            err.status = 403;
            err.message = 'You are not permitted to perform this.';
            res.status(403).json(err);
        }else{
            db.getStatus("ready", function(readyStatus) {
                if (readyStatus == "true") {
                    startCooking(req, res);
                } else {
                    var actionResponse = {
                        "statusCode": 200,
                        "status": "success"
                    };
                    actionResponse.message = "Coffee Machine is not ready.";

                    res.json(actionResponse);
                    serverCom.sendMessageToServer("Coffee Machine is already in use.");
                }
            });
        }
});

var startCooking = function(req, res) {
    var choices = func.functions[0].parameters[0].choices;
    var paramName = func.functions[0].parameters[0].name;
    var paramNumber = parseInt(req.query[paramName]);
    var choice = choices[paramNumber];
    if (choice) {
        db.setStatus("ready", "false", "boolean", function() {
            var actionResponse = {
                "statusCode": 200,
                "status": "success"
            };
            actionResponse.message = choice + " is ready soon!";

            res.json(actionResponse);

            io.emit('cook', choice);
        });
    } else {
        // a wrong parameter was sent
        var err = new Error();
        err.status = 406;
        err.message = 'Parameter for command is wrong';
        res.status(406).json(err);
    }
};

module.exports = router;