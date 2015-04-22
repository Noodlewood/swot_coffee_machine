var db = require('./db.js');
var serverCom = require('./serverCommunication');

io.on('connection', function (socket) {
    socket.on('cooking_finished', function (drink) {
        db.setStatus("ready", "true", function() {
            serverCom.sendMessageToServer(drink + " is ready!");
            serverCom.sendInfoUpdateNotification();
        });
        db.setStatus("progress", 0, function() {
            serverCom.sendInfoUpdateNotification();
        });
    });
    socket.on('progress', function (progress) {
        db.setStatus("progress", progress, function() {
            serverCom.sendInfoUpdateNotification();
        });
    });
});
