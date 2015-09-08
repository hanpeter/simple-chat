App.controller('AppController', ['$scope', 'SocketService', function ($scope, SocketService) {
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
        }
    });

    SocketService.on('startMessages', function (messages) {
        $scope.messages = messages;
        console.log($scope.messages);
    });
    SocketService.on('message', function (message) {
        $scope.messages.push(message);
        console.log($scope.messages);
    });
    SocketService.emit('register', $scope.user.name);
    SocketService.on('registered', function (user) { $scope.user = user; });
}]);