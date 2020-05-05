"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_opcua_1 = require("node-opcua");
const assert = require("assert");
const builder_1 = require("./builder");
class DataSpecificationTemplateBuilder extends builder_1.Builder {
    constructor(coreaas) {
        super(coreaas);
    }
    /** Template: Terminal */
    addDataSpecificationTerminalTemplate(options) {
        const templateType = this.coreaas.findCoreAASObjectType("DataSpecificationTerminalTemplateType");
        const dataSpec = this._namespace.addObject({
            typeDefinition: templateType,
            browseName: options.browseName || "dataSpecificationContent",
            description: options.description,
            nodeId: options.nodeId
        });
        if (options.terminalType != null)
            this._addUAProperty_for_string(dataSpec, "terminalType", options.terminalType);
        if (options.terminalNumber != null)
            this._addUAProperty_for_int16(dataSpec, "terminalNumber", options.terminalNumber);
        return dataSpec;
    }
    _addUAProperty_for_string(dataSpec, browseName, value) {
        assert(!dataSpec.hasOwnProperty(browseName), "dataSpec already contains a UA Proeprty with the browseName " + browseName);
        this._namespace.addVariable({
            browseName: browseName,
            propertyOf: dataSpec,
            dataType: "String",
            value: {
                get: () => {
                    return new node_opcua_1.Variant({
                        dataType: node_opcua_1.DataType.String,
                        value: value
                    });
                }
            }
        });
    }
    _addUAProperty_for_int16(dataSpec, browseName, value) {
        assert(!dataSpec.hasOwnProperty(browseName), "dataSpec already contains a UA Proeprty with the browseName " + browseName);
        this._namespace.addVariable({
            browseName: browseName,
            propertyOf: dataSpec,
            dataType: "Int16",
            value: {
                get: () => {
                    return new node_opcua_1.Variant({
                        dataType: node_opcua_1.DataType.Int16,
                        value: value
                    });
                }
            }
        });
    }
}
exports.DataSpecificationTemplateBuilder = DataSpecificationTemplateBuilder;
//# sourceMappingURL=DataSpecificationTemplateBuilder.js.map