app.controller('rscCtrl', function($scope, $location, mainService, elementsService) {
    $scope.showList;
    $scope.resourceList;

    $scope.init = function() {
        $scope.resourceList = [
            {name: "Details of the AAS", path: "rsc/pdf/2018-details-of-the-asset-administration-shell.pdf", alt: "Details of the administration shell pdf", bShow: true},
            {name: "Vacuum Gripper Robot datasheet", path: "rsc/datasheets/536630-Vacuum_Gripper_Robot_24V.pdf", alt: "Vacuum gripper robot datasheet pdf", bShow: false},
            {name: "Automated High Bay Warehouse datasheet", path: "rsc/datasheets/536631-Automated_High-Bay_Warehouse_24V.pdf", alt: "Automated high bay warehouse datasheet pdf", bShow: false},
            {name: "Multi Processing Station datasheet", path: "rsc/datasheets/536632-Multi_Processing_Station_24V.pdf", alt: "Multi processing station datasheet pdf", bShow: false},
            {name: "Sortier Line datasheet", path: "rsc/datasheets/536633-Sortier_Line_24V.pdf", alt: "Sortier line datasheet pdf", bShow: false},
            {name: "PLC 1214C DC/DC/DC datasheet", path: "rsc/datasheets/6ES72141AG400XB0_datasheet_en.pdf", alt: "PLC 1214C DC/DC/DC datasheet pdf", bShow: false},
        ];
    }
    
    $scope.setShow = function(index){
        for(var i=0; i<$scope.resourceList.length; i++) {
            $scope.resourceList[i].bShow = (i==index);
        }
    }

    $scope.init();
});