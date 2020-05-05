app.controller('configListCtrl', function($scope, $window, mainService, configurationService, modalService, restService, toastr) {
    $scope.bLoading = false;

    $scope.init = function() {
        $scope.bLoading = true;
        restService.getConfigurations().then(function successCallback(response) {
            $scope.$parent.configurationList = response.data;
            $scope.bLoading = false;
        }, function errorCallback(response) {$scope.error("Errore durante il caricamento delle configurazioni!")});
    }

    $scope.error = function(msg) {
        $scope.bLoading = false; 
        toastr.error(msg, 'Errore');
    }

    $scope.success = function(msg) {
        $scope.bLoading = false; 
        toastr.success(msg, 'Successo');
    }

    $scope.edit = function(elem) {
        configurationService.setEdit(true);
        $window.location.href = elem.id;
    }

    $scope.delete = function(elem) {
        var deleteModal = modalService.getDeleteModal();
        deleteModal.result.then(function() {
            $scope.bLoading = true;
            restService.deleteConfiguration(elem.id.split("/")[5]).then(function successCallback(response) {
                restService.getConfigurations().then(function successCallback(response) {
                    $scope.$parent.configurationList = response.data;
                    $scope.success("Cancellazione della configurazione completata!");
                }, function errorCallback(response) {$scope.error("Errore durante il caricamento delle configurazioni!")});
            }, function errorCallback(response) {$scope.error("Errore durante la cancellazione della configurazione!")});
        },function(){ /*cancel*/ });
    }

    $scope.uploadPlcProgram = function(id) {
        $scope.bLoading = true;
        restService.uploadPlcProgram(id.split("/")[5]).then(function successCallback(response) {
            $scope.success("La configurazione è stata caricata sul device!");
        }, function errorCallback(response) { 
            $scope.error("Errore durante il caricamento della configurazione sul device")
        });
    }

    $scope.init();
});