var fs = require('fs');
var express = require('express');
var router = express.Router();
var request = require('request');

var db = require('./db.js');
var thingFunctions = require('./functionsInfo');


/**
 * Sends a status message to the swot server
 * @param thingMessage The message to send
 */
var sendMessageToServer = function(thingMessage){

    db.getNetworkData(function(accessToken, err) {
        request.post(
            'http://localhost:8080/swot/web/app_dev.php/api/v1/thing/messages',
            {
                form:
                { message: thingMessage },
                headers: {
                    "content-type" : "application/x-www-form-urlencoded",
                    "accesstoken": accessToken
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log("message was send successful");
                    console.log(body);
                }else{
                    console.log("message couldn't be send");
                    console.log(error);
                }
            }
        );
    });
};

/**
 * Sends functions update notification with the data to the server.
 */
var sendUpdateNotification = function(){

    db.getNetworkData(function(accessToken, err) {
        request.post(
            'http://localhost:8080/swot/web/app_dev.php/api/v1/thing/functions/update',
            {
                form: {message: "The thing functions has been updated."},
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "accesstoken": accessToken
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log("update was send successful");
                    console.log(body);
                } else {
                    console.log("update couldn't be send");
                    console.log(error);
                }
            }
        );
    });
};

/**
 * Sends information update notification with the data to the server.
 */
var sendInfoUpdateNotification = function(){

    db.getNetworkData(function(accessToken, err) {
        request.post(
            'http://localhost:8080/swot/web/app_dev.php/api/v1/thing/information/update',
            {
                form: {message: "Thing information has been updated."},
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "accesstoken": accessToken
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log("info update was send successful");
                    console.log(body);
                } else {
                    console.log("info update couldn't be send");
                    console.log(error);
                }
            }
        );
    });
};

module.exports.sendMessageToServer = sendMessageToServer;
module.exports.sendUpdateNotification = sendUpdateNotification;
module.exports.sendInfoUpdateNotification = sendInfoUpdateNotification;
