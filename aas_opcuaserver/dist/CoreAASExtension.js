"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const builder_1 = require("./builders/builder");
const assert = require("assert");
const _1 = require(".");
/**
 * This class represents the extension part of the OPC UA Server relevant to the CoreAAS Information Model.\
 * An instance of **CoreAASExtension** provides all the methods to populate the AddressSpace with instances of the ObjectTypes coming from CoreAAS.\
 * Furthermore it provides the Constructors for the Structured DataType defined in CoreAAS and lot of utilities methods to find Nodes in the Namespace of CoreAAS.
 */
class CoreAASExtension {
    /**
     * @param addressSpace The Address Space instance of the current OPC UA Server.
     */
    constructor(addressSpace) {
        this.addressSpace = addressSpace;
        /** The complete URI of CoreAAS. */
        this.namespaceUri = "http://dieei.unict.it/coreAAS/";
        /** The absolute path to the CoreAAS xml file. */
        this.coreaasXmlFile = path.join(__dirname, "../nodesets/coreaas.xml");
        /**
         * A Map containing all the Identifiables' ids as key and the relevant UAObject as value.
         * This attribute can be useful to implement function to resolve AAS References into Objects
         * in the AddressSpace. */
        this.identifiableMap = new Map();
        this._aasBuilder = new builder_1.AASBuilder(this);
        this._administrativeBuilder = new builder_1.AdministrativeInformationBuilder(this);
        this._aasReferenceBuilder = new builder_1.AASReferenceBuilder(this);
        this._assetBuilder = new builder_1.AssetBuilder(this);
        this._submodelPropertyBuilder = new builder_1.SubmodelPropertyBuilder(this);
        this._submodelBuilder = new builder_1.SubmodelBuilder(this);
        this._dataSpecificationIECBuilder = new builder_1.DataSpecificationIEC61360Builder(this);
        this._dataSpecificationTemplateBuilder = new builder_1.DataSpecificationTemplateBuilder(this);
        this._edsBuilder = new builder_1.EmbeddedDataSpecificationBuilder(this);
        this._conceptDescriptionBuilder = new builder_1.ConceptDescriptionBuilder(this);
        this._conceptDictionaryBuilder = new builder_1.ConceptDictionaryBuilder(this);
        this._submodelElementsBuilder = new builder_1.SubmodelElementsBuilder(this);
        this._viewBuilder = new builder_1.ViewBuilder(this);
    }
    /* Getters */
    /** The Namespace instance of the CoreAAS Information Model. */
    get coreAASNamespace() {
        return this.addressSpace.getNamespace(this.namespaceUri);
    }
    /** The Namespace instance of the current Namespace. */
    get namespace() {
        return this.addressSpace.getOwnNamespace();
    }
    /** The namespace index of the CoreAAS Information Model */
    get namespaceIndex() {
        return this.addressSpace.getNamespaceIndex(this.namespaceUri);
    }
    /* CoreAAS OPCUA Types */
    /** The Constructor of the Identifier Structured DataType. */
    get Identifier() {
        const identifierDataType = this.coreAASNamespace.findDataType("Identifier");
        return this.addressSpace.getExtensionObjectConstructor(identifierDataType);
    }
    /** The Constructor of the Key Structured DataType. */
    get Key() {
        const keyDataType = this.coreAASNamespace.findDataType("Key");
        return this.addressSpace.getExtensionObjectConstructor(keyDataType);
    }
    /* AddressSpace Builder methods */
    /**
     * Create and returns an instance of AASType ObjectType in the AddressSpace.
     */
    addAssetAdministrationShell(options) {
        return this._aasBuilder.addAssetAdministrationShell(options);
    }
    /** Create an AdministrativeInformation Object in the AddressSpace. */
    addAdministrativeInformation(options) {
        return this._administrativeBuilder.addAdministrativeInformation(options);
    }
    /** Create an instance of AASReferenceType ObjectType in the AddressSpace. */
    addAASReference(options) {
        return this._aasReferenceBuilder.addAASReference(options);
    }
    /** Create an instance of AssetType ObjectType in the AddressSpace. */
    addAsset(options) {
        return this._assetBuilder.addAsset(options);
    }
    /** Create an instance of SubmodelPropertyType ObjectType in the AddressSpace. */
    addSubmodelProperty(options) {
        return this._submodelPropertyBuilder.addSubmodelProperty(options);
    }
    /** Create an instance of ReferenceElementType ObjectType in the AddressSpace. */
    addReferenceElement(options) {
        return this._submodelElementsBuilder.addReferenceElement(options);
    }
    /** Create an instance of FileType ObjectType in the AddressSpace. */
    addAASFile(options) {
        return this._submodelElementsBuilder.addAASFile(options);
    }
    /** Create an instance of SubmodelElementCollectionType ObjectType in the AddressSpace. */
    addSubmodelElementCollection(options) {
        return this._submodelElementsBuilder.addSubmodelElementCollection(options);
    }
    /** Create an instance of SubmodelRelationshipElementType ObjectType in the AddressSpace. */
    addSubmodelRelationshipElement(options) {
        return this._submodelElementsBuilder.addSubmodelRelationshipElement(options);
    }
    /** Create an instance of SubmodelOperationType ObjectType in the AddressSpace. */
    addSubmodelOperation(options) {
        return this._submodelElementsBuilder.addSubmodelOperation(options);
    }
    /** Create an instance of SubmodelType ObjectType in the AddressSpace. */
    addSubmodel(options) {
        return this._submodelBuilder.addSubmodel(options);
    }
    /** Create an instance of ViewType ObjectType in the AddressSpace. */
    addAASView(options) {
        return this._viewBuilder.addAASView(options);
    }
    /** Create an instance of DataSpecificationIEC61360Type ObjectType in the AddressSpace. */
    addDataSpecificationIEC61360(options) {
        return this._dataSpecificationIECBuilder.addDataSpecificationIEC61360(options);
    }
    /** Create an instance of addDataSpecificationTerminalTemplate ObjectType in the AddressSpace. */
    addDataSpecificationTerminalTemplate(options) {
        return this._dataSpecificationTemplateBuilder.addDataSpecificationTerminalTemplate(options);
    }
    /** Create an instance of EmbeddedDataSpecificationType ObjectType in the AddressSpace. */
    addEmbeddedDataSpecification(options) {
        return this._edsBuilder.addEmbeddedDataSpecification(options);
    }
    /** Create an instance of ConceptDescriptionType ObjectType in the AddressSpace. */
    addConceptDescription(options) {
        return this._conceptDescriptionBuilder.addConceptDescription(options);
    }
    /** Create an instance of ConceptDictionaryType ObjectType in the AddressSpace. */
    addConceptDictionary(options) {
        return this._conceptDictionaryBuilder.addConceptDictionary(options);
    }
    /* Utility methods */
    /**
     * Find and returns an ObjectType in the CoreAAS Namespace, otherwise return null.
     * @param name The name of the ObjectType to find.
     */
    findCoreAASObjectType(name) {
        return this.addressSpace.findObjectType(name, this.namespaceIndex);
    }
    /**
     * Find and returns a ReferenceType in the CoreAAS Namespace, otherwise return null.
     * @param name The name of the ReferenceType to find.
     */
    findCoreAASReferenceType(name) {
        return this.addressSpace.findReferenceType(name, this.namespaceIndex);
    }
    /**
     * Find and returns a DataType in the CoreAAS Namespace, otherwise return null.
     * @param name The name of the DataType to find.
     */
    findCoreAASDataType(name) {
        return this.addressSpace.findDataType(name, this.namespaceIndex);
    }
    /** Returns the AASType ObjectType. */
    getAASType() {
        return this.findCoreAASObjectType("AASType");
    }
    /** Returns the AdministrativeInformationType ObjectType. */
    getAdministrativeInformationType() {
        return this.findCoreAASObjectType("AdministrativeInformationType");
    }
    /** Returns the AssetType ObjectType. */
    getAssetType() {
        return this.findCoreAASObjectType("AssetType");
    }
    /** Returns the AASReferenceType ObjectType. */
    getAASReferenceType() {
        return this.findCoreAASObjectType("AASReferenceType");
    }
    /**
     * This function look in the AddressSpace for the entity Object pointed by **ref** and returns a n UAObject eventually.\
     * Two version of this function exist: the version with a callback and the version with the return value. Using a callback avoid this
     * function to return a value, and viceversa.
     * @param ref An AASReferenceType Instance representing the the AAS reference to fetch.
     * @param callback A callback function that receive an Error as first parameter or the found Object as second parameter.
     *
     * example:
     * ```typescript
     * //The following AAS Reference is created as example. Let's supposte is already exists in the AddressSpace.
     *  let ref = server.coreaas.addAASReference({
     *      organizedBy: aas_1,
     *      browseName: "ereoto",
     *      keys: [
     *          new Key({
     *              idType: KeyType.URI,
     *              local: true,
     *              type: KeyElements.Submodel,
     *              value: "http://www.zvei.de/demo/submodel/12345679"
     *          }),
     *          new Key({
     *              idType: KeyType.idShort,
     *              local: true,
     *              type: KeyElements.SubmodelElementCollection,
     *              value: "Measurement"
     *          }),
     *          new Key({
     *              idType: KeyType.idShort,
     *              local: true,
     *              type: KeyElements.Property,
     *              value: "rotationSpeed"
     *          })
     *      ]
     *  });
     *  //This version of the function use a callback.
     *  server.coreaas.fetchAASReference(ref, function(err: Error , obj: UAObject) {
     *      if (err) {
     *          return console.log(err);
     *      }
     *      console.log(obj);
     *  });
     *  //This version of the function retruns the value or null otherwise.
     *  let result = server.coreaas.fetchAASReference(ref);
     *  console.log(result);
     * ```
     * */
    fetchAASReference(ref, callback) {
        assert(ref.typeDefinitionObj.isSupertypeOf(this.findCoreAASObjectType("AASReferenceType")), "ref is not an AASReferenceType instance.");
        let keys = ref.keys._dataValue.value.value;
        let currentNamespace;
        for (let key of keys) {
            if (this.identifiableMap.has(key.value)) {
                currentNamespace = this.identifiableMap.get(key.value);
            }
            else if (currentNamespace && currentNamespace.referableChildrenMap.has(key.value)) {
                currentNamespace = currentNamespace.referableChildrenMap.get(key.value);
            }
            else {
                currentNamespace = undefined;
                break;
            }
            ;
        }
        if (currentNamespace == null)
            return (callback != null) ? callback(new Error("Referred entity not found"), null) : null;
        return (callback != null) ? callback(null, currentNamespace) : currentNamespace;
    }
    /** Address Space Creation Functions */
    /** Creates an AAS and adds to it its submodel references  */
    createAssetAdministrationShell(server, browseName, administrativeInformation, itDescription, enDescription, id, assetRef, submodelRefs) {
        const aas = server.coreaas.addAssetAdministrationShell({
            browseName: browseName,
            administration: administrativeInformation,
            description: [new _1.LocalizedText({ locale: "en", text: itDescription }),
                new _1.LocalizedText({ locale: "it", text: enDescription })],
            identification: new server.coreaas.Identifier({
                id: id,
                idType: _1.IdentifierType.URI
            }),
            assetRef: [new server.coreaas.Key({
                    idType: _1.KeyType.URI,
                    local: true,
                    type: _1.KeyElements.Asset,
                    value: assetRef
                })]
        });
        for (let i = 0; i < submodelRefs.length; i++) {
            aas.addSubmodelRef([new server.coreaas.Key({
                    idType: _1.KeyType.URI,
                    local: true,
                    type: _1.KeyElements.Submodel,
                    value: submodelRefs[i]
                })]);
        }
        return aas;
    }
    /** Creates an asset and adds it to its AAS */
    createAsset(server, browseName, kind, idShort, id, itDescription, enDescription, aas, identificationSubmodelRef) {
        const asset = server.coreaas.addAsset({
            browseName: browseName,
            idShort: idShort,
            identification: new server.coreaas.Identifier({
                id: id,
                idType: _1.IdentifierType.URI
            }),
            kind: kind,
            description: [new _1.LocalizedText({ locale: "en", text: itDescription }),
                new _1.LocalizedText({ locale: "it", text: enDescription })],
            assetOf: aas,
            assetIdentificationModelRef: [new server.coreaas.Key({
                    idType: _1.KeyType.URI,
                    local: true,
                    type: _1.KeyElements.Submodel,
                    value: identificationSubmodelRef
                })]
        });
        return asset;
    }
    /** Creates a submodel and adds it to its AAS if kind==instance */
    createSubmodel(server, browseName, kind, idShort, id, semanticElementType, semanticId, aas) {
        const submodel = server.coreaas.addSubmodel({
            browseName: browseName,
            kind: kind,
            idShort: idShort,
            identification: new server.coreaas.Identifier({
                id: id,
                idType: _1.IdentifierType.URI
            }),
            semanticId: [new server.coreaas.Key({
                    idType: _1.KeyType.URI,
                    local: true,
                    type: semanticElementType,
                    value: semanticId
                })]
        });
        if (kind == _1.Kind.Instance)
            submodel.submodelOf(aas);
        return submodel;
    }
    /** Creates a submodel property and adds it to its submodel */
    createSubmodelProperty(server, browseName, kind, idShort, submodel, semanticElementType, semanticId, category, valueType, dataType1, dataType2, value, templateData, templateURI) {
        let embedded = undefined;
        if (templateURI != undefined && templateData != undefined) {
            embedded = server.coreaas.addEmbeddedDataSpecification({
                browseName: "EmbeddedDS",
                hasDataSpecification: [new server.coreaas.Key({
                        idType: _1.KeyType.URI,
                        local: true,
                        type: _1.KeyElements.GlobalReference,
                        value: templateURI // templateURI = URI del template (locale)
                    })],
            });
            if (templateData.terminalNumber != undefined) {
                embedded = embedded.addDataSpecificationTerminalTemplate(templateData); // templateData = object con i campi aggiuntivi
            }
        }
        const property = server.coreaas.addSubmodelProperty({
            browseName: browseName,
            kind: kind,
            idShort: idShort,
            submodelElementOf: submodel,
            semanticId: (semanticId != "")
                ? [new server.coreaas.Key({
                        idType: _1.KeyType.URI,
                        local: true,
                        type: semanticElementType,
                        value: semanticId
                    })]
                : undefined,
            category: category,
            valueType: valueType,
            value: {
                dataType: dataType1,
                value: {
                    get: () => {
                        return new _1.Variant({ dataType: dataType2, value: value });
                    }
                }
            },
            hasEmbeddedDataSpecifications: embedded
        });
        return property;
    }
    /** Creates a submodel file and adds it to its submodel */
    createSubmodelFile(server, browseName, kind, idShort, submodel, semanticElementType, semanticId, mimeType, value) {
        const file = server.coreaas.addAASFile({
            browseName: browseName,
            kind: kind,
            idShort: idShort,
            submodelElementOf: submodel,
            semanticId: (semanticId != "")
                ? [new server.coreaas.Key({
                        idType: _1.KeyType.URI,
                        local: true,
                        type: semanticElementType,
                        value: semanticId
                    })]
                : undefined,
            mimeType: mimeType,
            value: value
        });
        return file;
    }
    /** Creates a submodel element collection and adds it to its submodel */
    createSubmodelElementCollection(server, browseName, kind, idShort, submodel, semanticElementType, semanticId, values) {
        const collection = server.coreaas.addSubmodelElementCollection({
            browseName: browseName,
            kind: kind,
            idShort: idShort,
            ordered: true,
            submodelElementOf: submodel,
            semanticId: (semanticId != "")
                ? [new server.coreaas.Key({
                        idType: _1.KeyType.URI,
                        local: true,
                        type: semanticElementType,
                        value: semanticId
                    })]
                : undefined,
        }).addParent([new server.coreaas.Key({
                idType: _1.KeyType.URI,
                local: true,
                type: _1.KeyElements.Submodel,
                value: submodel.identification.readValue().value.value.id
            })
        ]).addElements(values);
        return collection;
    }
    /** Creates a submodel relationship element and adds it to its submodel */
    createSubmodelRelationshipElement(server, browseName, kind, idShort, submodel, semanticElementType, semanticId, first, firstElementType, firstRefType, second, secondElementType, secondRefType) {
        const relationship = server.coreaas.addSubmodelRelationshipElement({
            browseName: browseName,
            kind: kind,
            idShort: idShort,
            submodelElementOf: submodel,
            first: server.coreaas.addAASReference({
                browseName: "first",
                keys: [
                    new server.coreaas.Key({
                        idType: firstRefType,
                        local: true,
                        type: firstElementType,
                        value: first
                    })
                ]
            }),
            second: server.coreaas.addAASReference({
                browseName: "second",
                keys: [
                    new server.coreaas.Key({
                        idType: secondRefType,
                        local: true,
                        type: secondElementType,
                        value: second
                    })
                ]
            }),
            semanticId: (semanticId != "")
                ? [new server.coreaas.Key({
                        idType: _1.KeyType.URI,
                        local: true,
                        type: semanticElementType,
                        value: semanticId
                    })]
                : undefined
        });
        return relationship;
    }
    /** Creates a submodel operation and adds it to its submodel
     *  TODO: aggiungere parametro per act
    */
    createSubmodelOperation(server, browseName, kind, idShort, submodel, semanticElementType, semanticId) {
        const operation = server.coreaas.addSubmodelOperation({
            browseName: browseName,
            kind: kind,
            idShort: idShort,
            submodelElementOf: submodel,
            semanticId: (semanticId != "")
                ? [new server.coreaas.Key({
                        idType: _1.KeyType.URI,
                        local: true,
                        type: semanticElementType,
                        value: semanticId
                    })]
                : undefined
        });
        return operation;
    }
    /** Creates a Concept Dictionary and adds it to its AAS */
    createConceptDictionary(server, aas, browseName, idShort, enDescription, itDescription) {
        const conceptDictionary = server.coreaas.addConceptDictionary({
            browseName: browseName,
            idShort: idShort,
            conceptDictionaryOf: aas,
            description: [new _1.LocalizedText({ locale: "en", text: enDescription }),
                new _1.LocalizedText({ locale: "it", text: itDescription })]
        });
        return conceptDictionary;
    }
    /** Creates a Concept Description and adds it to its Concept Dictionary */
    createConceptDescription(server, conceptDictionaries, elements, browseName, preferredName, description, unit, id) {
        const embedded = server.coreaas.addEmbeddedDataSpecification({
            browseName: "EmbeddedDS",
            hasDataSpecification: [new server.coreaas.Key({
                    idType: _1.KeyType.URI,
                    local: false,
                    type: _1.KeyElements.GlobalReference,
                    value: "www.admin-shell.io/DataSpecificationTemplates/DataSpecificationIEC61360"
                })],
        })
            .addDataSpecificationIEC61360({
            preferredName: preferredName,
            unit: unit,
            description: description
        });
        const conceptDescription = server.coreaas.addConceptDescription({
            browseName: browseName,
            identification: new server.coreaas.Identifier({
                id: id,
                idType: _1.IdentifierType.URI
            }),
            hasEmbeddedDataSpecifications: embedded,
            conceptDescriptionOf: conceptDictionaries,
        })
            .semanticOf(elements);
        for (var i = 0; i < conceptDictionaries.length; i++) {
            conceptDictionaries[i].addConceptDescriptionRef([new server.coreaas.Key({
                    idType: _1.KeyType.URI,
                    local: true,
                    type: _1.KeyElements.ConceptDescription,
                    value: id
                })]);
        }
        return conceptDescription;
    }
}
exports.CoreAASExtension = CoreAASExtension;
//# sourceMappingURL=CoreAASExtension.js.map