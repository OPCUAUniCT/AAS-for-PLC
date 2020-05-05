import { UAObject, Variant, DataType, Int16 } from "node-opcua";
import { CoreAASExtension } from "../CoreAASExtension";
import { DataSpecificationTerminalTemplate } from "../types";
import assert = require("assert");
import { Builder } from "./builder";
import { DataSpecificationTerminalTemplateOptions } from "../options_types";

export class DataSpecificationTemplateBuilder extends Builder {

    constructor(coreaas: CoreAASExtension) {
        super(coreaas);
    }

    /** Template: Terminal */
    addDataSpecificationTerminalTemplate(options: DataSpecificationTerminalTemplateOptions): DataSpecificationTerminalTemplate {
        const templateType = this.coreaas.findCoreAASObjectType("DataSpecificationTerminalTemplateType")!;

        const dataSpec: DataSpecificationTerminalTemplate = this._namespace.addObject({
            typeDefinition: templateType,
            browseName: options.browseName || "dataSpecificationContent",
            description: options.description,
            nodeId: options.nodeId
        }) as DataSpecificationTerminalTemplate;

        if (options.terminalType != null) this._addUAProperty_for_string(dataSpec, "terminalType", options.terminalType);
        if (options.terminalNumber != null) this._addUAProperty_for_int16(dataSpec, "terminalNumber", options.terminalNumber);

        return dataSpec;
    }

    private _addUAProperty_for_string(dataSpec: UAObject, browseName: string, value: string): void {
        assert(!dataSpec.hasOwnProperty(browseName), "dataSpec already contains a UA Proeprty with the browseName " + browseName);

        this._namespace.addVariable({
            browseName: browseName,
            propertyOf: dataSpec,
            dataType: "String",
            value: {
                get: () => {
                    return new Variant({
                        dataType: DataType.String,
                        value: value
                    });
                }
            }
        });
    }

    private _addUAProperty_for_int16(dataSpec: UAObject, browseName: string, value: Int16): void {
        assert(!dataSpec.hasOwnProperty(browseName), "dataSpec already contains a UA Proeprty with the browseName " + browseName);

        this._namespace.addVariable({
            browseName: browseName,
            propertyOf: dataSpec,
            dataType: "Int16",
            value: {
                get: () => {
                    return new Variant({
                        dataType: DataType.Int16,
                        value: value
                    });
                }
            }
        });
    }
}