App.controller('NameModalController', ['$scope', function ($scope) {
    _.extend($scope, {
        name: ''
    });

    $('#nameModal').modal();
    $('#nameModal').on('shown.bs.modal', function () {
        $('#nameInput').focus();
    });
    $('#nameModal').on('hidden.bs.modal', function () {
        $scope.setName($scope.name);
    });
}]);