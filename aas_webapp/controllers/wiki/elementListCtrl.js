app.controller('elementListCtrl', function($scope, $location, mainService, elementsService) {
    $scope.elements;
    $scope.currentList;
    $scope.currentSection;

    $scope.init = function() {
        $scope.elements = elementsService.getElements();
        $scope.currentList = elementsService.getCurrentElementList();
        $scope.currentSection = mainService.getCurrentSection();
    }

    $scope.init();
});