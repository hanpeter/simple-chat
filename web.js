(function () {
    var express = require('express');
    var PORT = process.env.PORT || 9001;

    var app = express();
    app.use(express.static(__dirname));

    var io = require('socket.io').listen(app.listen(PORT, function () {
        console.log('Server started on port ' + PORT);
    }));

    io.sockets.on('connection', function (socket) {
        socket.emit('welcome');
    });
})();