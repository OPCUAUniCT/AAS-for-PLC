import { AddressSpace, ConstructorFunc, Namespace, UADataType, UAObject, UAObjectType, UAReferenceType, UAVariableType } from "node-opcua";
import * as path from "path";
import { AssetObject, AASObject, EDSObject, SubmodelPropertyObject, SubmodelObject, ConceptDescriptionObject, ConceptDictionaryObject, 
        DataSpecificationIEC61360, ReferenceElementObject, AASFileObject, SubmodelElementCollectionObject, ViewObject, Identifier, Key, 
        AASReferenceObject, ReferableNamespaceObject, AdministrativeInformationObject, SubmodelElementObject, SubmodelRelationshipElementObject, SubmodelOperationObject, DataSpecificationTerminalTemplate } from "./types";
import { AASBuilder, AdministrativeInformationBuilder, AASReferenceBuilder, AssetBuilder, DataSpecificationIEC61360Builder, 
        EmbeddedDataSpecificationBuilder, SubmodelPropertyBuilder, SubmodelBuilder, ConceptDescriptionBuilder, 
        ConceptDictionaryBuilder, SubmodelElementsBuilder, ViewBuilder, DataSpecificationTemplateBuilder } from "./builders/builder";
import { AASOptions, AASReferenceOptions, AdministrativeInformationOptions, AssetOptions, ConceptDescriptionOptions, ConceptDictionaryOptions, 
        DataSpecificationIECOptions, EmbeddedDataSpecificationOptions, SubmodelOptions, ReferenceElementOptions, FileOptions, SubmodelElementCollectionOptions, 
        SubmodelPropertyOptions, ViewOptions, SubmodelRelationshipElementOptions, SubmodelOperationOptions, DataSpecificationTerminalTemplateOptions } from "./options_types";
import assert = require("assert");
import { CoreServer, LocalizedText, KeyElements, KeyType, IdentifierType, Kind, PropertyCategory, PropertyValueType, Variant, DataType } from ".";

/**
 * This class represents the extension part of the OPC UA Server relevant to the CoreAAS Information Model.\
 * An instance of **CoreAASExtension** provides all the methods to populate the AddressSpace with instances of the ObjectTypes coming from CoreAAS.\
 * Furthermore it provides the Constructors for the Structured DataType defined in CoreAAS and lot of utilities methods to find Nodes in the Namespace of CoreAAS.
 */
export class CoreAASExtension {

    private _aasBuilder: AASBuilder;
    private _administrativeBuilder: AdministrativeInformationBuilder;
    private _aasReferenceBuilder: AASReferenceBuilder;
    private _assetBuilder: AssetBuilder;
    private _submodelPropertyBuilder: SubmodelPropertyBuilder;
    private _submodelBuilder: SubmodelBuilder;
    private _dataSpecificationIECBuilder: DataSpecificationIEC61360Builder;
    private _dataSpecificationTemplateBuilder: DataSpecificationTemplateBuilder;
    private _edsBuilder: EmbeddedDataSpecificationBuilder;
    private _conceptDescriptionBuilder: ConceptDescriptionBuilder;
    private _conceptDictionaryBuilder: ConceptDictionaryBuilder;
    private _submodelElementsBuilder: SubmodelElementsBuilder;
    private _viewBuilder: ViewBuilder;

    /** The complete URI of CoreAAS. */
    public readonly namespaceUri: string = "http://dieei.unict.it/coreAAS/";
    /** The absolute path to the CoreAAS xml file. */
    public readonly coreaasXmlFile: string = path.join(__dirname, "../nodesets/coreaas.xml");

    /** 
     * A Map containing all the Identifiables' ids as key and the relevant UAObject as value.
     * This attribute can be useful to implement function to resolve AAS References into Objects
     * in the AddressSpace. */
    public readonly identifiableMap: Map<string, UAObject> = new Map();
    
    /** 
     * @param addressSpace The Address Space instance of the current OPC UA Server.
     */
    constructor(public addressSpace: AddressSpace) {
        this._aasBuilder = new AASBuilder(this);
        this._administrativeBuilder = new AdministrativeInformationBuilder(this);
        this._aasReferenceBuilder = new AASReferenceBuilder(this);
        this._assetBuilder = new AssetBuilder(this);
        this._submodelPropertyBuilder = new SubmodelPropertyBuilder(this);
        this._submodelBuilder = new SubmodelBuilder(this);
        this._dataSpecificationIECBuilder = new DataSpecificationIEC61360Builder(this);
        this._dataSpecificationTemplateBuilder = new DataSpecificationTemplateBuilder(this);
        this._edsBuilder = new EmbeddedDataSpecificationBuilder(this);
        this._conceptDescriptionBuilder = new ConceptDescriptionBuilder(this);
        this._conceptDictionaryBuilder = new ConceptDictionaryBuilder(this);
        this._submodelElementsBuilder = new SubmodelElementsBuilder(this);
        this._viewBuilder = new ViewBuilder(this);
    }
    
    /* Getters */
    /** The Namespace instance of the CoreAAS Information Model. */
    get coreAASNamespace(): Namespace {
        return this.addressSpace.getNamespace(this.namespaceUri);
    }

    /** The Namespace instance of the current Namespace. */
    get namespace(): Namespace {
        return this.addressSpace.getOwnNamespace();
    }
    
    /** The namespace index of the CoreAAS Information Model */
    get namespaceIndex(): number {
        return this.addressSpace.getNamespaceIndex(this.namespaceUri);
    }

    /* CoreAAS OPCUA Types */
    /** The Constructor of the Identifier Structured DataType. */
    get Identifier(): new (...args: any[]) => Identifier {
        const identifierDataType = this.coreAASNamespace.findDataType("Identifier")!;
        return (<any>this.addressSpace).getExtensionObjectConstructor(identifierDataType);
    }

    /** The Constructor of the Key Structured DataType. */
    get Key(): new (...args: any[]) => Key {
        const keyDataType = this.coreAASNamespace.findDataType("Key")!;
        return (<any>this.addressSpace).getExtensionObjectConstructor(keyDataType);
    }

    /* AddressSpace Builder methods */
    /**
     * Create and returns an instance of AASType ObjectType in the AddressSpace.
     */
    addAssetAdministrationShell(options: AASOptions): AASObject {
        return this._aasBuilder.addAssetAdministrationShell(options);
    }

    /** Create an AdministrativeInformation Object in the AddressSpace. */
    addAdministrativeInformation(options: AdministrativeInformationOptions): AdministrativeInformationObject {
        return this._administrativeBuilder.addAdministrativeInformation(options);
    }

    /** Create an instance of AASReferenceType ObjectType in the AddressSpace. */
    addAASReference(options: AASReferenceOptions): AASReferenceObject{
        return this._aasReferenceBuilder.addAASReference(options);
    }

    /** Create an instance of AssetType ObjectType in the AddressSpace. */
    addAsset(options: AssetOptions): AssetObject {
        return this._assetBuilder.addAsset(options);
    }

    /** Create an instance of SubmodelPropertyType ObjectType in the AddressSpace. */
    addSubmodelProperty(options: SubmodelPropertyOptions): SubmodelPropertyObject {
        return this._submodelPropertyBuilder.addSubmodelProperty(options);
    }

    /** Create an instance of ReferenceElementType ObjectType in the AddressSpace. */
    addReferenceElement(options: ReferenceElementOptions): ReferenceElementObject {
        return this._submodelElementsBuilder.addReferenceElement(options);
    }

    /** Create an instance of FileType ObjectType in the AddressSpace. */
    addAASFile(options: FileOptions): AASFileObject {
        return this._submodelElementsBuilder.addAASFile(options);
    }

    /** Create an instance of SubmodelElementCollectionType ObjectType in the AddressSpace. */
    addSubmodelElementCollection(options: SubmodelElementCollectionOptions): SubmodelElementCollectionObject {
        return this._submodelElementsBuilder.addSubmodelElementCollection(options);
    }

    /** Create an instance of SubmodelRelationshipElementType ObjectType in the AddressSpace. */
    addSubmodelRelationshipElement(options: SubmodelRelationshipElementOptions): SubmodelRelationshipElementObject {
        return this._submodelElementsBuilder.addSubmodelRelationshipElement(options);
    }

    /** Create an instance of SubmodelOperationType ObjectType in the AddressSpace. */
    addSubmodelOperation(options: SubmodelOperationOptions): SubmodelOperationObject {
        return this._submodelElementsBuilder.addSubmodelOperation(options);
    }

    /** Create an instance of SubmodelType ObjectType in the AddressSpace. */
    addSubmodel(options: SubmodelOptions): SubmodelObject {
        return this._submodelBuilder.addSubmodel(options);
    }

    /** Create an instance of ViewType ObjectType in the AddressSpace. */
    addAASView(options: ViewOptions): ViewObject {
        return this._viewBuilder.addAASView(options);
    }

    /** Create an instance of DataSpecificationIEC61360Type ObjectType in the AddressSpace. */
    addDataSpecificationIEC61360(options: DataSpecificationIECOptions): DataSpecificationIEC61360 {
        return this._dataSpecificationIECBuilder.addDataSpecificationIEC61360(options);
    }

    /** Create an instance of addDataSpecificationTerminalTemplate ObjectType in the AddressSpace. */
    addDataSpecificationTerminalTemplate(options: DataSpecificationTerminalTemplateOptions): DataSpecificationTerminalTemplate {
        return this._dataSpecificationTemplateBuilder.addDataSpecificationTerminalTemplate(options);
    }

    /** Create an instance of EmbeddedDataSpecificationType ObjectType in the AddressSpace. */
    addEmbeddedDataSpecification(options: EmbeddedDataSpecificationOptions): EDSObject {
        return this._edsBuilder.addEmbeddedDataSpecification(options);
    }

    /** Create an instance of ConceptDescriptionType ObjectType in the AddressSpace. */
    addConceptDescription(options: ConceptDescriptionOptions): ConceptDescriptionObject {
        return this._conceptDescriptionBuilder.addConceptDescription(options);
    }

    /** Create an instance of ConceptDictionaryType ObjectType in the AddressSpace. */
    addConceptDictionary(options: ConceptDictionaryOptions): ConceptDictionaryObject {
        return this._conceptDictionaryBuilder.addConceptDictionary(options);
    }
    
    /* Utility methods */
    /**
     * Find and returns an ObjectType in the CoreAAS Namespace, otherwise return null.
     * @param name The name of the ObjectType to find.
     */
    findCoreAASObjectType(name: string): UAObjectType | null {
        return this.addressSpace.findObjectType(name, this.namespaceIndex);
    }

    /**
     * Find and returns a ReferenceType in the CoreAAS Namespace, otherwise return null.
     * @param name The name of the ReferenceType to find.
     */
    findCoreAASReferenceType(name: string): UAReferenceType | null {
        return this.addressSpace.findReferenceType(name, this.namespaceIndex);
    }
    
    /**
     * Find and returns a DataType in the CoreAAS Namespace, otherwise return null.
     * @param name The name of the DataType to find.
     */
    findCoreAASDataType(name: string): UADataType | null {
        return this.addressSpace.findDataType(name, this.namespaceIndex);
    }

    /** Returns the AASType ObjectType. */
    getAASType(): UAObjectType {
        return this.findCoreAASObjectType("AASType")!;
    }

    /** Returns the AdministrativeInformationType ObjectType. */
    getAdministrativeInformationType(): UAObjectType {
        return this.findCoreAASObjectType("AdministrativeInformationType")!;
    }

    /** Returns the AssetType ObjectType. */
    getAssetType(): UAObjectType {
        return this.findCoreAASObjectType("AssetType")!;
    }

    /** Returns the AASReferenceType ObjectType. */
    getAASReferenceType(): UAObjectType {
        return this.findCoreAASObjectType("AASReferenceType")!;
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
    fetchAASReference(ref: AASReferenceObject, callback?: Function): UAObject | void {
        assert(ref.typeDefinitionObj.isSupertypeOf(this.findCoreAASObjectType("AASReferenceType")!), "ref is not an AASReferenceType instance.");
        let keys = ref.keys._dataValue.value.value;
        let currentNamespace;
        for (let key of keys) {
            if (this.identifiableMap.has(key.value)) {
                currentNamespace = this.identifiableMap.get(key.value);
            }
            else if (currentNamespace && (<any>currentNamespace).referableChildrenMap.has(key.value)) {
                currentNamespace = (<any>currentNamespace).referableChildrenMap.get(key.value);
            }
            else {
                currentNamespace = undefined;
                break;
            };
        }

        if (currentNamespace == null) 
            return (callback != null) ? callback(new Error("Referred entity not found"), null) :  null;

        return (callback != null) ? callback(null, currentNamespace) : currentNamespace;

    }


    /** Address Space Creation Functions */

    /** Creates an AAS and adds to it its submodel references  */
    createAssetAdministrationShell(server: CoreServer, browseName: string, administrativeInformation: AdministrativeInformationObject, itDescription: string, enDescription: string, id: string, assetRef: string, submodelRefs: string[]): AASObject {
        const aas = server.coreaas.addAssetAdministrationShell({
            browseName: browseName, 
            administration: administrativeInformation,
            description: [  new LocalizedText({locale: "en", text: itDescription}),
                            new LocalizedText({locale: "it", text: enDescription}) ],
            identification: new server.coreaas.Identifier({
                id: id,
                idType: IdentifierType.URI
            }),
            assetRef: [new server.coreaas.Key({
                idType: KeyType.URI,
                local: true,
                type: KeyElements.Asset,
                value: assetRef
            })]
        })
        for(let i=0; i<submodelRefs.length; i++){
            aas.addSubmodelRef([new server.coreaas.Key({
                idType: KeyType.URI,
                local: true,
                type: KeyElements.Submodel,
                value: submodelRefs[i]
            })]);
        }

        return aas;
    }

    /** Creates an asset and adds it to its AAS */
    createAsset(server: CoreServer, browseName: string, kind: Kind, idShort: string, id: string, itDescription: string, enDescription: string, aas: AASObject, identificationSubmodelRef: string): AssetObject {
        const asset = server.coreaas.addAsset({
            browseName: browseName,
            idShort: idShort,
            identification: new server.coreaas.Identifier({
                id: id,
                idType: IdentifierType.URI
            }),
            kind: kind,
            description: [  new LocalizedText({locale: "en", text: itDescription}),
                            new LocalizedText({locale: "it", text: enDescription}) ],
            assetOf: aas,
            assetIdentificationModelRef: [ new server.coreaas.Key({
                idType: KeyType.URI,
                local: true,
                type: KeyElements.Submodel,
                value: identificationSubmodelRef
            }) ]
        });

        return asset;
    }
    
    /** Creates a submodel and adds it to its AAS if kind==instance */
    createSubmodel(server: CoreServer, browseName: string, kind: Kind, idShort: string, id: string, semanticElementType: number, semanticId: string,  aas: AASObject): SubmodelObject {
        const submodel = server.coreaas.addSubmodel({
            browseName: browseName,
            kind: kind,
            idShort: idShort,
            identification: new server.coreaas.Identifier({
                id: id,
                idType: IdentifierType.URI
            }),
            semanticId: [ new server.coreaas.Key({
                idType: KeyType.URI,
                local: true,
                type: semanticElementType,
                value: semanticId
            })]
        })
        
        if(kind == Kind.Instance) 
            submodel.submodelOf(aas);
        
        return submodel;
    }

    /** Creates a submodel property and adds it to its submodel */
    createSubmodelProperty(server: CoreServer, browseName: string, kind: Kind, idShort: string, submodel: SubmodelObject[] | undefined, semanticElementType: number, semanticId: string, category: PropertyCategory, valueType: PropertyValueType, dataType1: string, dataType2: DataType, value: any, templateData?: object, templateURI?: string): SubmodelPropertyObject {
        let embedded = undefined;

        if(templateURI != undefined && templateData != undefined) {
            embedded = server.coreaas.addEmbeddedDataSpecification({
                browseName: "EmbeddedDS",
                hasDataSpecification: [ new server.coreaas.Key({
                    idType: KeyType.URI,
                    local: true,
                    type: KeyElements.GlobalReference,                              // TODO: GlobalReference? Check it!
                    value: templateURI                                              // templateURI = URI del template (locale)
                }) ],
            })

            if((templateData as DataSpecificationTerminalTemplate).terminalNumber != undefined) {
                embedded = embedded.addDataSpecificationTerminalTemplate(templateData as DataSpecificationTerminalTemplate);        // templateData = object con i campi aggiuntivi
            }
        }
        
        const property = server.coreaas.addSubmodelProperty({
            browseName: browseName,
            kind: kind,
            idShort: idShort,
            submodelElementOf: submodel,
            semanticId: 
                (semanticId != "") 
                    ? [ new server.coreaas.Key({
                    idType: KeyType.URI,
                    local: true,
                    type: semanticElementType,
                    value: semanticId
                }) ]
                    : undefined,
            category: category,
            valueType: valueType,
            value: {
                dataType: dataType1,
                value: {
                    get: () => {
                        return new Variant({ dataType: dataType2, value: value});
                    }
                }
            },
            hasEmbeddedDataSpecifications: embedded
        });
        return property;
    }

    /** Creates a submodel file and adds it to its submodel */
    createSubmodelFile(server: CoreServer, browseName: string, kind: Kind, idShort: string, submodel: SubmodelObject | undefined, semanticElementType: number, semanticId: string, mimeType: string, value: string): AASFileObject {
        const file = server.coreaas.addAASFile({
            browseName: browseName,
            kind: kind,
            idShort: idShort,
            submodelElementOf: submodel,
            semanticId: 
                (semanticId != "") 
                    ? [ new server.coreaas.Key({
                    idType: KeyType.URI,
                    local: true,
                    type: semanticElementType,
                    value: semanticId
                }) ]
                    : undefined,
            mimeType: mimeType,
            value: value
        });

        return file;
    }

    /** Creates a submodel element collection and adds it to its submodel */
    createSubmodelElementCollection(server: CoreServer, browseName: string, kind: Kind, idShort: string, submodel: SubmodelObject, semanticElementType: number, semanticId: string, values: SubmodelElementObject[]): SubmodelElementCollectionObject {
        const collection = server.coreaas.addSubmodelElementCollection({
            browseName: browseName,
            kind: kind,
            idShort: idShort,
            ordered: true,
            submodelElementOf: submodel,
            semanticId: 
                (semanticId != "") 
                    ? [ new server.coreaas.Key({
                    idType: KeyType.URI,
                    local: true,
                    type: semanticElementType,
                    value: semanticId
                }) ]
                    : undefined,
        }).addParent([new server.coreaas.Key({
            idType: KeyType.URI,
            local: true,
            type: KeyElements.Submodel,
            value: submodel.identification.readValue().value.value.id
            })
        ]).addElements(values);

        return collection;
    }

    /** Creates a submodel relationship element and adds it to its submodel */
    createSubmodelRelationshipElement(server: CoreServer, browseName: string, kind: Kind, idShort: string, submodel: SubmodelObject | undefined, semanticElementType: number, semanticId: string, first: string, firstElementType: number, firstRefType: KeyType, second: string, secondElementType: number, secondRefType: KeyType): SubmodelRelationshipElementObject {
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
            semanticId: 
                (semanticId != "") 
                    ? [ new server.coreaas.Key({
                    idType: KeyType.URI,
                    local: true,
                    type: semanticElementType,
                    value: semanticId
                }) ]
                    : undefined
        })

        return relationship;
    }

    /** Creates a submodel operation and adds it to its submodel 
     *  TODO: aggiungere parametro per act
    */
    createSubmodelOperation(server: CoreServer, browseName: string, kind: Kind, idShort: string, submodel: SubmodelObject[], semanticElementType: number, semanticId: string): SubmodelOperationObject {
        const operation = server.coreaas.addSubmodelOperation({
            browseName: browseName,
            kind: kind,
            idShort: idShort,
            submodelElementOf: submodel,
            semanticId: 
                (semanticId != "") 
                    ? [ new server.coreaas.Key({
                    idType: KeyType.URI,
                    local: true,
                    type: semanticElementType,
                    value: semanticId
                }) ]
                    : undefined
        })

        return operation;
    }
    
    /** Creates a Concept Dictionary and adds it to its AAS */
    createConceptDictionary(server: CoreServer, aas: AASObject, browseName: string, idShort: string, enDescription: string, itDescription: string): ConceptDictionaryObject {
        const conceptDictionary = server.coreaas.addConceptDictionary({
            browseName: browseName,
            idShort: idShort,
            conceptDictionaryOf: aas,
            description: [new LocalizedText({locale: "en", text: enDescription}), 
                        new LocalizedText({locale: "it", text: itDescription})]
            })

        return conceptDictionary; 
    }

    /** Creates a Concept Description and adds it to its Concept Dictionary */
    createConceptDescription(server: CoreServer, conceptDictionaries: ConceptDictionaryObject[], elements: UAObject[], browseName: string, preferredName: string, description: string, unit: string, id: string): ConceptDescriptionObject {
        const embedded = server.coreaas.addEmbeddedDataSpecification({
            browseName: "EmbeddedDS",
            hasDataSpecification: [ new server.coreaas.Key({
                idType: KeyType.URI,
                local: false,
                type: KeyElements.GlobalReference,
                value: "www.admin-shell.io/DataSpecificationTemplates/DataSpecificationIEC61360"
            }) ],
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
                idType: IdentifierType.URI
            }),
            hasEmbeddedDataSpecifications: embedded,
            conceptDescriptionOf: conceptDictionaries,
        })
        .semanticOf(elements);

        for(var i=0; i<conceptDictionaries.length; i++) {
            conceptDictionaries[i].addConceptDescriptionRef(
                [ new server.coreaas.Key({
                    idType: KeyType.URI,
                    local: true,
                    type: KeyElements.ConceptDescription,
                    value: id
                }) ]
            );
        }
        

        return conceptDescription;
    }
}

