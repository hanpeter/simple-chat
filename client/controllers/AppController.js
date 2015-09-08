App.controller('AppController', ['$scope', '$window', '$timeout', 'SocketService', function ($scope, $window, $timeout, SocketService) {
    _.extend($scope, {
        messages: [],
        user: {
            name: 'Peter'
        },
        text: '',
        send: function () {
            SocketService.emit('message', {
                senderID: $scope.user.id,
                message: $scope.text
            }, function () {
                $scope.text = '';
            });
        },
        setName: function (name) {
            SocketService.emit('register', name, function (user) { $scope.user = user; });
        }
    });

    SocketService.on('startMessages', function (messages) {
        $scope.messages = messages;
        $timeout(function () {
            $window.scrollTo(0, $window.document.body.scrollHeight);
        });
    });
    SocketService.on('message', function (message) {
        $scope.messages.push(message);
        $timeout(function () {
            $window.scrollTo(0, $window.document.body.scrollHeight);
        });
    });
}]);