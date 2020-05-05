app.service("mainService", function($location) {
    this.baseUrl = config.webapp.address + "/";
    this.nodeServerUrl = config.nodeserver.address;
    this.sections = {index: "Home", configurations: "Configuration", resources: "Resource", descriptions: "Concept Description", submodels: "Submodel", assets: "Asset", aas: "Asset Administration Shell", dataspecs: "Data Specification"};

    
    this.getCurrentSection = function() {
        return $location.absUrl().split("/")[4];
    }
});