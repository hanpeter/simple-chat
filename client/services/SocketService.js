App.service('SocketService', ['$rootScope', function ($rootScope) {
    var me = this;
    var socket = io();

    _.extend(me, {
        on: function (event, callback) {
            callback = callback || _.noop;

            socket.on(event, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (event, data, callback) {
            callback = callback || _.noop;

            socket.emit(event, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }
    });
}]);