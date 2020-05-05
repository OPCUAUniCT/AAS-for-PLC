app.service("restService", function($http, mainService) {
    
    // Create a new Configuration
    this.createConfiguration = function(configuration) {
        return $http.post(mainService.nodeServerUrl + "/configurations", configuration);
    }

    // Retrieve all Configuration
    this.getConfigurations = function(){
        return $http.get(mainService.nodeServerUrl + "/configurations");
    }
    
    // Retrieve a single Configuration with id
    this.getConfiguration = function(id){
        return $http.get(mainService.nodeServerUrl + "/configurations/" + id);
    }

    // Update a Configuration with id
    this.updateConfiguration = function(id, configuration){
        return $http.put(mainService.nodeServerUrl + "/configurations/" + id, configuration);
    }

    // Delete a Configuration with id
    this.deleteConfiguration = function(id){
        return $http.delete(mainService.nodeServerUrl + "/configurations/" + id);
    }

    // Upload a Configuration with id
    this.uploadPlcProgram = function(id){
        return $http.get(mainService.nodeServerUrl + "/upload/" + id);
    }
});