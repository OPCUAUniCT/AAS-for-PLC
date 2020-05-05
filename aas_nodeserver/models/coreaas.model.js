const mongoose = require('mongoose');

const TerminalSchema = mongoose.Schema({
    plcTerminalId: String, 
    islandTerminalId: String, 
    island: String, 
    value: Boolean
}, { _id: false});

const IslandSchema = mongoose.Schema({
    multiProcessingStation: Boolean, 
    sortingLine: Boolean, 
    vacuumGripper: Boolean, 
    automatedHighBayWarehouse: Boolean
}, { _id: false});

const MappingSchema = mongoose.Schema({
    multiProcessingStation: [TerminalSchema], 
    sortingLine: [TerminalSchema], 
    vacuumGripper: [TerminalSchema], 
    automatedHighBayWarehouse: [TerminalSchema]
}, { _id: false});

const ConfigurationSchema = mongoose.Schema({
    name: String,
    islands: IslandSchema,
    description: String, 
    mapping: MappingSchema,
    id: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Configuration', ConfigurationSchema);