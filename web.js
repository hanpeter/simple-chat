(function () {
    var express = require('express');
    var chat = require('./server/Chat.js')();
    var PORT = process.env.PORT || 9001;

    var app = express();
    app.use(express.static(__dirname));

    var io = require('socket.io').listen(app.listen(PORT, function () {
        console.log('Server started on port ' + PORT);
    }));

    io.sockets.on('connection', function (socket) {
        socket.emit('startMessages', chat.lastMessages);

        socket.on('register', function (name, callback) {
            callback(chat.addUser(name));
        });

        socket.on('message', function (message, callback) {
            var index = chat.addMessage(message.senderID, message.message);
            callback();
            io.sockets.emit('message', chat.messages[index]);
        });

        socket.on('moreMessages', function (args, callback) {
            callback(chat.getMessages(args.last.id, args.count));
        });
    });
})();