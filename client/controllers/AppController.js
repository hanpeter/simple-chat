App.controller('AppController', ['$scope', '$window', '$timeout', 'SocketService', 'PageCount', function ($scope, $window, $timeout, SocketService, PageCount) {
    _.extend($scope, {
        messages: [],
        hasMore: false,
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
        },
        getMoreMessages: function () {
            SocketService.emit('moreMessages', {
                last: $scope.messages[0],
                count: PageCount
            }, function (messages) {
                $scope.hasMore = (messages.length >= PageCount);
                $scope.messages = messages.concat($scope.messages);
            });
        }
    });

    SocketService.on('startMessages', function (messages) {
        $scope.messages = messages;
        $scope.hasMore = (messages.length >= PageCount);
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