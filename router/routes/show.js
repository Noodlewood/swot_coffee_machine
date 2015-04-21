var express = require('express');
var router = express.Router();

/**
 * Show route. It's the main route to visiualize the status.
 */
router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;
