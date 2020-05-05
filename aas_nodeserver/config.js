var config = {database: {}, webapp: {}, nodeserver: {}, openPlcRuntime: {}};

config.database = 
    {
        ip: "localhost",
        port: "27017",
        dbname: "coreaas"
    };
config.database.address = "mongodb://" + config.database.ip + ":" + config.database.port + "/" + config.database.dbname;


config.webapp = 
    {
        ip: "localhost",
        port: "8081",
        basepath: "#coreaas"
    };
config.webapp.address = "http://" + config.webapp.ip + ":" + config.webapp.port + "/" + config.webapp.basepath;

config.nodeserver = 
    {
        ip: "localhost",
        port: "3000"
    };
config.nodeserver.address = "http://" + config.nodeserver.ip + ":" + config.nodeserver.port

config.openPlcRuntime = 
    {
        ip: "localhost",
        port: "8080"
    };
config.openPlcRuntime.address = "http://" + config.openPlcRuntime.ip + ":" + config.openPlcRuntime.port;

module.exports = config;