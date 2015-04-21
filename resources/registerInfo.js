var tokens = require('./tokens.js');

var registerInfo = {
    "device": {
        "id": "Coffee Machine",
        "classification": "Cooking",
        "url": "http://localhost:3000",
        "api": {
            "deregister": "http://localhost:3000/deregister",
            "function": "http://localhost:3000/functions",
            "status": "http://localhost:3000/status",
            "profileimage": "http://localhost:3000/downloads/prototype_profile.jpg"
        }
    }};

// add tokens to register info
registerInfo.device['tokens'] = tokens.tokens;

module.exports = registerInfo;