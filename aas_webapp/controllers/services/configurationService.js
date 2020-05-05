app.service("configurationService", function($location, mainService, restService) {
   
    /* === VARIABLES === */
    this.configurationList = [];
    this.terminalMappingList = {};
    this.bedit = false;
    this.ISLAND_ENUM;

    /* === FUNCTIONS === */
    this.init = function() {
        this.ISLAND_ENUM = {MPS: "multiProcessingStation", SL: "sortingLine", VG: "vacuumGripper", AHBW: "automatedHighBayWarehouse"};

        this.terminalMappingList = {multiProcessingStation: [], sortingLine: [], vacuumGripper: [], automatedHighBayWarehouse: []};
        this.addTerminalsMapping("Terminal-Q0.0", "Terminal-MotorVacuumOven", "multiProcessingStation", true);
        this.addTerminalsMapping("Terminal-Q0.1", "Terminal-MotorVacuumTurntable", "multiProcessingStation", true); 
        this.addTerminalsMapping("Terminal-Q0.2", "Terminal-MotorOvenRetract", "multiProcessingStation", true); 
        this.addTerminalsMapping("Terminal-Q0.3", "Terminal-MotorOvenExtend", "multiProcessingStation", true); 
        this.addTerminalsMapping("Terminal-Q0.4", "Terminal-LightOven", "multiProcessingStation", true); 
        this.addTerminalsMapping("Terminal-Q0.5", "Terminal-Compressor", "multiProcessingStation", true); 
        this.addTerminalsMapping("Terminal-Q0.6", "Terminal-MotorTurntable", "multiProcessingStation", true); 
        this.addTerminalsMapping("Terminal-Q0.7", "Terminal-MotorT2Turntable", "multiProcessingStation", true); 
        this.addTerminalsMapping("Terminal-Q1.0", "Terminal-MotorConveyorBelt", "multiProcessingStation", true); 
        this.addTerminalsMapping("Terminal-Q1.1", "Terminal-MotorSaw", "multiProcessingStation", true); 
        this.addTerminalsMapping("Terminal-Q1.2", "Terminal-ValveVacuum", "multiProcessingStation", true); 
        this.addTerminalsMapping("Terminal-Q1.3", "Terminal-ValveLowering", "multiProcessingStation", true); 
        this.addTerminalsMapping("Terminal-Q1.4", "Terminal-ValveOvenDoor", "multiProcessingStation", true); 
        this.addTerminalsMapping("Terminal-Q1.5", "Terminal-ValveFeeder", "multiProcessingStation", true); 

        this.addTerminalsMapping("Terminal-Q1.6", "Terminal-MotorVertAxisUp", "vacuumGripper", true); 
        this.addTerminalsMapping("Terminal-Q1.7", "Terminal-MotorVertAxisDown", "vacuumGripper", true); 
        this.addTerminalsMapping("Terminal-Q2.0", "Terminal-MotorHorAxisBackward", "vacuumGripper", true); 
        this.addTerminalsMapping("Terminal-Q2.1", "Terminal-MotorHorAxisForward", "vacuumGripper", true); 
        this.addTerminalsMapping("Terminal-Q2.2", "Terminal-MotorRotateCW", "vacuumGripper", true); 
        this.addTerminalsMapping("Terminal-Q2.3", "Terminal-MotorRotateCCW", "vacuumGripper", true); 
        this.addTerminalsMapping("Terminal-Q2.4", "Terminal-Compressor", "vacuumGripper", true); 
        this.addTerminalsMapping("Terminal-Q2.5", "Terminal-Valve", "vacuumGripper", true); 

        this.addTerminalsMapping("Terminal-Q2.6", "Terminal-MotorConveyorBelt", "sortingLine", true); 
        this.addTerminalsMapping("Terminal-Q2.7", "Terminal-Compressor", "sortingLine", true); 
        this.addTerminalsMapping("Terminal-Q3.0", "Terminal-ValveEjector1", "sortingLine", true); 
        this.addTerminalsMapping("Terminal-Q3.1", "Terminal-ValveEjector2", "sortingLine", true); 
        this.addTerminalsMapping("Terminal-Q3.2", "Terminal-ValveEjector3", "sortingLine", true);
        
        this.addTerminalsMapping("Terminal-Q3.3", "Terminal-MotorConveyorBeltF", "automatedHighBayWarehouse", true); 
        this.addTerminalsMapping("Terminal-Q3.4", "Terminal-MotorConveyorBeltB", "automatedHighBayWarehouse", true); 
        this.addTerminalsMapping("Terminal-Q3.5", "Terminal-MotorHorizontalRack", "automatedHighBayWarehouse", true); 
        this.addTerminalsMapping("Terminal-Q3.6", "Terminal-MotorHorizontalConvBelt", "automatedHighBayWarehouse", true); 
        this.addTerminalsMapping("Terminal-Q3.7", "Terminal-MotorVerticalDown", "automatedHighBayWarehouse", true); 
        this.addTerminalsMapping("Terminal-Q4.0", "Terminal-MotorVerticalUp", "automatedHighBayWarehouse", true); 
        this.addTerminalsMapping("Terminal-Q4.1", "Terminal-MotorCantileverF", "automatedHighBayWarehouse", true); 
        this.addTerminalsMapping("Terminal-Q4.2", "Terminal-MotorCantileverB", "automatedHighBayWarehouse", true); 
    }

    this.getNextConfigId = function(configurations) {
        return (Math.max(...configurations.map(o => o.id.split("/")[5]), 0))+1;        
    }

    this.addTerminalsMapping = function(plcTerminalId, islandTerminalId, island, value) {
        this.terminalMappingList[island].push({plcTerminalId: plcTerminalId, islandTerminalId: islandTerminalId, island: island, value: value});
    };

    this.getTerminalMappingList = function() {
        return this.terminalMappingList;
    }

    this.setEdit = function(bEdit) {
        this.bEdit = bEdit;
    }

    this.getEdit = function() {
        return this.bEdit;
    }
});