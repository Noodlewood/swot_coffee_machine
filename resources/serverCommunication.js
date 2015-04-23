var fs = require('fs');
var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('./db');

var swotRestRoutes = require('./swotRestRoutes');


/**
 * Sends a status message to the swot server
 * @param thingMessage The message to send
 */
var sendMessageToServer = function(thingMessage){

    db.getNetworkData(function(accessToken, err) {
        request.post(
            swotRestRoutes.routes.post_messages,
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
 * Sends funtions update notification with the data to the server.
 */
var sendUpdateNotification = function(){

    db.getNetworkData(function(accessToken, err) {
        request.post(
            swotRestRoutes.routes.post_functions_update,
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
            swotRestRoutes.routes.post_info_update,
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

/**
 * Sends profile image update notification with the data to the server.
 */
var sendImageUpdateNotification = function(){

    db.getNetworkData(function(accessToken, err) {
        request.post(
            swotRestRoutes.routes.post_image_update,
            {
                form: {profileimage: "http://localhost:3000/downloads/prototype_profile.jpg"},
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "accesstoken": accessToken
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log("image update was send successful");
                    console.log(body);
                } else {
                    console.log("image update couldn't be send");
                    console.log(error);
                }
            }
        );
    });
};

module.exports.sendMessageToServer = sendMessageToServer;
module.exports.sendUpdateNotification = sendUpdateNotification;
module.exports.sendInfoUpdateNotification = sendInfoUpdateNotification;
module.exports.sendImageUpdateNotification = sendImageUpdateNotification;
