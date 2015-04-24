var tokens = require('./tokens.js');

var registerInfo = {
    "device": {
        "name": "Coffee Machine",
        "description": "You can make Coffee with this! Classic, Cappuccino, Espresso, Macchiato... and you can even double them! Awesome? AWESOME!",
        "profileimage": baseUrl + "/downloads/prototype_profile.jpg",
        "api": {
            "url": baseUrl
        }
    }};

// add tokens to register info
registerInfo.device['tokens'] = tokens.tokens;

module.exports = registerInfo;