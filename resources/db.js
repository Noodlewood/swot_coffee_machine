var fs = require('fs');
var express = require('express');
var router = express.Router();

var dataFile = "resources/deviceData.db";

var sqlite3 = require("sqlite3").verbose();

/**
 * Initializes the DB
 */
var initializeDB = function () {
    var exists = fs.existsSync(dataFile);

    if(!exists){
        console.log("DB not found ... creating new one");
        fs.openSync(dataFile, "w");
    }

    var db = new sqlite3.Database(dataFile);

    db.serialize(function() {
        if (!exists) {
            db.run("CREATE TABLE access_token (token varchar(255), used tinyint)");
            var stmt = db.prepare("INSERT INTO access_token VALUES ('r3g1st3rT0k3n', 0)");
            stmt.run();
            stmt.finalize();

            db.run("CREATE TABLE status (root varchar(255), root_status varchar(255))");
            stmt = db.prepare("INSERT INTO status VALUES ('ready', 'true')");
            stmt.run();
            stmt.finalize();

            stmt = db.prepare("INSERT INTO status VALUES ('progress', '0')");
            stmt.run();
            stmt.finalize();

            db.run("CREATE TABLE network_data (network_token varchar(255))");
        }
    });
    db.close();
};

/**
 * Sets the device_token to used
 * @param tokenUsed Sets the value of the device_token to used or not used.
 */
var setAccessTokenToUsed = function(){
    // @TODO alternative to open DB?!
    var db = new sqlite3.Database(dataFile);
    // @TODO keep id as indicator what to set?
    db.run("UPDATE access_token SET used = 1 WHERE ROWID = ?", 1);
    db.close();
};

/**
 * Sets the device_token free
 * @param tokenUsed Sets the value of the device_token to used or not used.
 */
var setAccessTokenFree = function(){
    var db = new sqlite3.Database(dataFile);
    db.run("UPDATE access_token SET used = 0 WHERE ROWID = ?", 1);
    db.close();
};

/**
 * Returns the access token
 */
var getAccessToken = function(callback){
    var db = new sqlite3.Database(dataFile);
    db.get("SELECT token, used FROM access_token WHERE ROWID = ?", 1, function(err, row) {
        callback(row.token, row.used, err);
    } );

    db.close();
};

/**
 * Sets the network data of the device
 * @param network_token
 * @param network_id
 */
var setNetworkData = function(network_token){
    console.log(network_token);
    var db = new sqlite3.Database(dataFile);
    var stmt = db.prepare("INSERT INTO network_data VALUES (?)", network_token);
    stmt.run();
    stmt.finalize();

    db.close();
};

/**
 * Gets the network token.
 * @param callback
 */
var getNetworkData = function(callback){
    var db = new sqlite3.Database(dataFile);
    db.get("SELECT network_token FROM network_data WHERE ROWID = ?", 1 , function(err, row) {
        callback(row.network_token, err);
    });
    db.close();
};

/**
 * Clears the given network data
 * @param network_token
 */
var deleteNetworkData = function(network_token){
    var db = new sqlite3.Database(dataFile);
    db.run("DELETE FROM network_data WHERE network_token = ?", network_token);
    db.close();
};

/**
 * Returns the status info of the sensors.
 * @param callback
 */
var getStatusInfo = function(callback){
    var db = new sqlite3.Database(dataFile);
    db.all("SELECT root, root_status FROM status", function(err, rows) {
        var info = "[";
        rows.forEach(function (row) {
            var root = "'title' : '" + row.root + "'";
            var root_status = "'value' : '" + row.root_status + "'";
            info += "{" + root + "," + root_status + "}";
        });
        info += "]";
        var statusObject = eval('(' + info + ')');
        callback(statusObject);
    } );
    db.close();
};

/**
 * Returns the status of given sensor
 * @param sensor
 * @param callback
 */
var getStatus = function(sensor, callback){
    var db = new sqlite3.Database(dataFile);
    db.get("SELECT root_status FROM status WHERE root = ?", sensor, function(err, row) {
        callback(row.root_status);
    } );
    db.close();
};

/**
 * Sets the status of a sensor.
 * @param root
 * @param root_status
 */
var setStatus = function(root, root_status, callback){
    var db = new sqlite3.Database(dataFile);
    db.run("UPDATE status SET root_status = ? WHERE root = ?", root_status, root, function() {
        callback();
    });
    db.close();
};

// Exports the functions
module.exports.setAccessTokenToUsed = setAccessTokenToUsed;
module.exports.setAccessTokenFree = setAccessTokenFree;
module.exports.initializeDB = initializeDB;
module.exports.getAccessToken = getAccessToken;
module.exports.setNetworkData = setNetworkData;
module.exports.getNetworkData = getNetworkData;
module.exports.deleteNetworkData = deleteNetworkData;
module.exports.getStatusInfo = getStatusInfo;
module.exports.setStatus = setStatus;
module.exports.getStatus = getStatus;
