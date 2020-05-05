app.controller('elementCtrl', function($scope, $routeParams, $location, mainService, elementsService) {
    $scope.elements;
    $scope.currentElement;
    $scope.currentSection;
    
    $scope.init = function() {
        $scope.elements = elementsService.getElements();
        $scope.currentElement = elementsService.getCurrentElement();
        $scope.currentSection = mainService.getCurrentSection();
    }

    $scope.init();
});