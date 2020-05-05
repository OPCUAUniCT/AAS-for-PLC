const Configuration = require('../models/coreaas.model.js');
const appConfig = require('../config.js')
const http = require('http');
const webAppBaseUrl = appConfig.webapp.address + "/";
const runtimeBaseUrl = appConfig.openPlcRuntime.address + "/";
const webAppConfigUrl = webAppBaseUrl + "configurations/";

const rscPath = "./rsc/openplc/";
var fs = require('fs');
var readline = require('readline');

// Create and Save a new Configuration
exports.createConfiguration = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Configuration content can not be empty"
        });
    }

    // Create a Configuration
    const configuration = new Configuration({
        name: req.body.name || "Untitled Configuration", 
        islands: req.body.islands,
        description: req.body.description, 
        mapping: req.body.mapping,
        id: req.body.id
    });

    // Save Configuration in the database
    configuration.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Configuration."
        });
    });
};

// Retrieve and return all configurations from the database.
exports.findAllConfiguration = (req, res) => {
    Configuration.find()
    .then(configurations => {
        res.send(configurations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving configurations."
        });
    });
};

// Find a single configuration with a id
exports.findOneConfiguration = (req, res) => {
    Configuration.find({id: webAppConfigUrl + req.params.id})
    .then(configuration => {
        if(!configuration) {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });            
        }
        res.send(configuration);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving configuration with id " + req.params.id
        });
    });
};

// Update a configuration identified by the id in the request
exports.updateConfiguration = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Configuration content can not be empty"
        });
    }

    // Find configuration and update it with the request body
    Configuration.findOneAndUpdate({id: webAppConfigUrl + req.params.id}, {
        name: req.body.name || "Untitled Configuration", 
        islands: req.body.islands,
        description: req.body.description, 
        mapping: req.body.mapping,
        id: req.body.id
    }, {new: true})
    .then(configuration => {
        if(!configuration) {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });
        }
        res.send(configuration);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating configuration with id " + req.params.id
        });
    });
};

// Delete a configuration with the specified id in the request
exports.deleteConfiguration = (req, res) => {
    Configuration.findOneAndRemove({id: webAppConfigUrl + req.params.id})
    .then(configuration => {
        if(!configuration) {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });
        }
        res.send({message: "Configuration deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete configuration with id " + req.params.id
        });
    });
};

// Upload a configuration with id
exports.uploadConfiguration = (req, res) => {
    Configuration.find({id: webAppConfigUrl + req.params.id})
    .then(configuration => {
        if(!configuration) {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });            
        }

        // Edit .st and .xml files    
        var configObject = configuration[0].toObject();
        var terminalArray = [];

        for (islands in configObject.mapping)
            for (var i=0; i<configObject.mapping[islands].length; i++)
                terminalArray.push(configObject.mapping[islands][i].value);

        // Edit .st file
        var stEditor = readline.createInterface({
            input: fs.createReadStream(rscPath + "plcTemplate.st"),
            output: fs.createWriteStream(rscPath + "plc.st"),
            console: false
        });                    
        var stMappingElement = 0;

        stEditor.on('line', function(line) {
            var lineArray = line.split(" ");  
            var toWrite = "";                    

            if (stMappingElement < terminalArray.length && lineArray.length == 11)    // Corresponds to a line to be modified
                lineArray[10] = (terminalArray[stMappingElement++] + ";"); // Edits values in the plc memory to be written on terminal according to the configuration mapping

            for (var i=0; i<lineArray.length; i++) {
                toWrite += (lineArray[i] + " ");
            }
            toWrite += "\r\n";
            this.output.write(toWrite);
        });

        // Edit .xml file
        var xmlEditor = readline.createInterface({
            input: fs.createReadStream(rscPath + "plcTemplate.xml"),
            output: fs.createWriteStream(rscPath + "plc.xml"),
            console: false
        });
        var xmlMappingElement = 0;

        xmlEditor.on('line', function(line) {
            var lineArray = line.split(" ");  
            var toWrite = "";

            if (xmlMappingElement < terminalArray.length && lineArray[16] == "<simpleValue")    // Corresponds to a line to be modified
                lineArray[17] = ("value=\"" + terminalArray[xmlMappingElement++] + "\"/>"); // Edits values in the plc memory to be written on terminal according to the configuration mapping

            for (var i=0; i<lineArray.length; i++) {
                toWrite += (lineArray[i] + " ");
            }
            toWrite += "\r\n";
            this.output.write(toWrite);
        });

        // Carica i file .st sul runtime
        http.get(runtimeBaseUrl + "login", (resp) => {
            let data = '';

            resp.on('data', (chunk) => { data += chunk; });
            resp.on('end', () => { 
                console.log("Successfully logged!"); 
                
                http.get(runtimeBaseUrl + "upload_configuration", (resp) => {
                    let data = '';
        
                    resp.on('data', (chunk) => { data += chunk; });
                    resp.on('end', () => { 
                        console.log("Configuration successfully uploaded!"); 
                        res.send("Configuration successfully uploaded!");
                    });
                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                    res.status(500).send({
                        message: "Error: " + err.message 
                    });
                });

            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            res.status(500).send({
                message: "Error: " + err.message 
            });
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Configuration not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving configuration with id " + req.params.id
        });
    });
};