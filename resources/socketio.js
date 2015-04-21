var db = require('./db.js');
var serverCom = require('./serverCommunication');

io.on('connection', function (socket) {
    socket.on('cooking_finished', function () {
        db.setStatus("ready", "true", function() {
            serverCom.sendMessageToServer("Coffee is ready!");
            serverCom.sendInfoUpdateNotification();
        });
        db.setStatus("progress", 0, function() {
            //serverCom.sendInfoUpdateNotification();
        });
    });
    socket.on('progress', function (progress) {
        db.setStatus("progress", progress, function() {
            console.log(progress);
            //serverCom.sendInfoUpdateNotification();
        });
    });
});
