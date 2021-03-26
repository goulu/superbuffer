"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const buffer_1 = require("./buffer");
const schema_1 = require("./schema");
const views_1 = require("./views");
const utils_1 = require("./utils");
/**
 * The Model class provides an API for serializing and deserializing ArrayBuffers into objects
 * specified by their Schema definitions.
 */
class Model {
    /**
     * Create a new Model instance.
     * @param schema Schema instance that this model is defined by.
     * @param bufferSize The maximum size of serializable data. Default: 1 megabyte.
     * @param littleEndian The endianness. Default is false
     */
    constructor(schema, bufferSize, littleEndian) {
        this.arraySizeEncoding = views_1.uint16;
        this._buffer = new buffer_1.BufferManager(bufferSize, littleEndian);
        this.schema = schema;
    }
    /**
     * Create a Model directly from the provided schema name and definition.
     * @param name Unique name of the schema.
     * @param struct Structure of the schema.
     * @param littleEndian The endianness. Default is false
     */
    static fromSchemaDefinition(struct, 
    // id?: number,
    littleEndian) {
        return new Model(new schema_1.Schema(struct), undefined, littleEndian);
    }
    /**
     * Serialize an object or an array of objects defined by this Model's schema into an ArrayBuffer.
     * @param objectOrArray The object or array of objects to be serialized.
     */
    toBuffer(objectOrArray) {
        this._buffer.refresh();
        if (Array.isArray(objectOrArray)) {
            // this._buffer.append(uint8, Model.BUFFER_ARRAY);
            // this._buffer.append(uint8, this.schema.id);
            this._buffer.append(this.arraySizeEncoding, objectOrArray.length);
            for (let i = 0; i < objectOrArray.length; i++) {
                this.serialize(objectOrArray[i], this.schema.struct);
            }
        }
        else {
            // this._buffer.append(uint8, Model.BUFFER_OBJECT);
            // this._buffer.append(uint8, this.schema.id);
            this.serialize(objectOrArray, this.schema.struct);
        }
        return this._buffer.finalize();
    }
    /**
     * Deserialize an ArrayBuffer to reconstruct the original object or array of objects defined by
     * the schema of this Model.
     * @param buffer The ArrayBuffer to be deserialized.
     * @param expect The expected buffer type (i.e. `Model.BUFFER_OBJECT) for deserialization.
     */
    fromBuffer(buffer) {
        if (buffer.byteLength > this._buffer.maxByteSize) {
            throw new Error('Buffer exceeds max allocation size.');
        }
        this._buffer.refresh(buffer);
        // trust the schema structure
        if (Array.isArray(this.schema)) {
            // Handle array
            const numElements = this._buffer.read(this.arraySizeEncoding);
            const results = [];
            for (let i = 0; i < numElements; i++) {
                results.push(this.deserialize(this.schema.struct));
            }
            return results;
        }
        return this.deserialize(this.schema.struct);
    }
    /**
     * Serialize data that adheres to the provided object structure.
     * @param data Data to be serialized.
     * @param struct SchemaMap structure in the schema definition.
     */
    serialize(data, struct) {
        for (const [key, schemaProp] of struct) {
            const dataProp = data[key]; // Actual data values
            // BufferView
            if (utils_1.isBufferView(schemaProp)) {
                this._buffer.append(schemaProp, dataProp);
            }
            // Schema
            else if (schemaProp instanceof schema_1.Schema) {
                this.serialize(dataProp, schemaProp.struct);
            }
            // Array
            else if (Array.isArray(schemaProp)) {
                this._buffer.append(this.arraySizeEncoding, dataProp.length);
                const element = schemaProp[0];
                // Schema
                if (element instanceof schema_1.Schema) {
                    for (let i = 0; i < dataProp.length; i++) {
                        this.serialize(dataProp[i], element.struct);
                    }
                }
                // BufferView
                else if (utils_1.isBufferView(element)) {
                    for (let i = 0; i < dataProp.length; i++) {
                        this._buffer.append(element, dataProp[i]);
                    }
                }
            }
            // Object
            else if (utils_1.isObject(schemaProp)) {
                this.serialize(dataProp, schema_1.Schema.definition(schemaProp));
            }
        }
    }
    /**
     * Deserialize data from the ArrayBuffer that adheres to the provided object structure.
     * @param struct Object structure in the schema definition.
     */
    deserialize(struct) {
        const data = {};
        for (const [key, structValue] of struct) {
            // BufferView definition
            if (utils_1.isBufferView(structValue)) {
                data[key] = this._buffer.read(structValue);
            }
            // Array definition
            else if (Array.isArray(structValue)) {
                const numElements = this._buffer.read(this.arraySizeEncoding);
                const element = structValue[0];
                const results = [];
                if (element instanceof schema_1.Schema) {
                    for (let i = 0; i < numElements; i++) {
                        results.push(this.deserialize(element.struct));
                    }
                }
                else if (utils_1.isBufferView(element)) {
                    for (let i = 0; i < numElements; i++) {
                        results.push(this._buffer.read(element));
                    }
                }
                data[key] = results;
            }
            // Schema or object definition
            else {
                data[key] = this.deserialize(structValue instanceof schema_1.Schema ? structValue.struct : structValue);
            }
        }
        return data;
    }
}
exports.Model = Model;
//# sourceMappingURL=model.js.map