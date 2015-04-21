// initializes the routes
module.exports = function (app) {
    app.use('/',require('./routes/show'));
    app.use('/action', require('./routes/action'));
    app.use('/status', require('./routes/status'));
    app.use('/functions', require('./routes/functions'));
    app.use('/register', require('./routes/register'));
    app.use('/deregister', require('./routes/deregister'));
    app.use('/downloads', require('./routes/downloads'));
};
