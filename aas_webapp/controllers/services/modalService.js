app.service("modalService", function($uibModal, mainService) {

    this.getDeleteModal = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'modals/deleteModal.html',
            controllerAs: 'ctrl',
            size: 'sm',
            controller: function($scope, $uibModalInstance){
                $scope.cancel = function(){
                    $uibModalInstance.dismiss();
                };
                $scope.ok = function(){
                    $uibModalInstance.close();
                }
            }
        });
    };

});