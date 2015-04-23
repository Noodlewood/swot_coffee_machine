var tokens = require('./tokens.js');

var registerInfo = {
    "device": {
        "name": "Coffee Machine",
        "description": "You can make Coffee with this! Classic, Cappuccino, Espresso, Macchiato... and you can even double them! Awesome? AWESOME!",
        "profileimage": "http://localhost:3000/downloads/prototype_profile.jpg",
        "api": {
            "url": "http://localhost:3000"
        }
    }};

// add tokens to register info
registerInfo.device['tokens'] = tokens.tokens;

module.exports = registerInfo;