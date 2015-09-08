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

    $('#nameModal').modal();
    $('#nameModal').on('shown.bs.modal', function () {
        $('#nameInput').focus();
    });
    $('#nameModal').on('hidden.bs.modal', function () {
        SocketService.emit('register', $scope.user.name, function (user) { $scope.user = user; });
    });
}]);