// initializes the routes
module.exports = function (app) {
    app.use('/',require('./routes/show'));
    app.use('/action', require('./routes/action'));
    app.use('/information', require('./routes/information'));
    app.use('/functions', require('./routes/functions'));
    app.use('/register', require('./routes/register'));
    app.use('/deregister', require('./routes/deregister'));
    app.use('/downloads', require('./routes/downloads'));
};
