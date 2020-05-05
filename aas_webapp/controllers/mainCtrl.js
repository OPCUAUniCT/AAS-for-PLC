var app = angular.module('myApp', ["ngRoute", 'ngSanitize', 'ui.bootstrap', 'toastr']);

app.controller('mainCtrl', function($scope, $window, $location, mainService, elementsService, configurationService, restService, toastr) {
    $scope.baseUrl;
    $scope.currentSection;
    $scope.elements;
    $scope.configurationList;
    $scope.showList;
    $scope.bLoading;

    $scope.init = function(){
        $scope.baseUrl = mainService.baseUrl;
        elementsService.init();
        configurationService.init();
        $scope.showList = {bShow1: false, bShow2: false, bShow3: false, bShow4: false, bShow5: false, bShow6: false};
        $scope.elements = elementsService.getElements();
        $scope.bLoading = true;
        restService.getConfigurations().then(function successCallback(response) {
                $scope.configurationList = response.data;
                $scope.bLoading = false;
            }, function errorCallback(response) { $scope.error("Errore durante il caricamento delle configurazioni!") });
        $scope.currentSection = mainService.sections[$location.absUrl().split("/")[4]];

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    }
    
    $scope.error = function(msg) {
        $scope.bLoading = false; 
        toastr.error(msg, 'Errore');
    }

    $scope.success = function(msg) {
        $scope.bLoading = false; 
        toastr.success(msg, 'Successo');
    }
    
    $scope.windowsHRef = function(elem) {
        $window.location.href = elem.id;
    }

    $scope.redirectTo = function(elem) {
        $scope.currentSection = mainService.sections[elem.id.split("/")[4]];
        $scope.currentElement = elem;
        $scope.windowsHRef(elem);
    }

    $scope.setShow = function(bShowToSet){
        var actualVal = $scope.showList[bShowToSet];
        $scope.showList.bShow1 = $scope.showList.bShow2 = $scope.showList.bShow3 = $scope.showList.bShow4 = $scope.showList.bShow5 = $scope.showList.bShow6 = false;
        if(actualVal==false) $scope.showList[bShowToSet] = true;
    }

    $scope.init();
});