import { BufferManager } from './buffer';
import { Schema } from './schema';
import type { SchemaMap, SchemaData, SchemaDefinition } from './types';
/**
 * The Model class provides an API for serializing and deserializing ArrayBuffers into objects
 * specified by their Schema definitions.
 */
export declare class Model<T extends Record<string, unknown> = Record<string, unknown>> {
    /**
     * Schema definition reference.
     */
    readonly schema: Schema<T>;
    /**
     * Internal BufferManager reference.
     */
    protected readonly _buffer: BufferManager;
    arraySizeEncoding: import("./types").BufferView<number>;
    /**
     * Create a new Model instance.
     * @param schema Schema instance that this model is defined by.
     * @param bufferSize The maximum size of serializable data. Default: 1 megabyte.
     * @param littleEndian The endianness. Default is false
     */
    constructor(schema: Schema<T>, bufferSize?: number, littleEndian?: boolean);
    /**
     * Create a Model directly from the provided schema name and definition.
     * @param name Unique name of the schema.
     * @param struct Structure of the schema.
     * @param littleEndian The endianness. Default is false
     */
    static fromSchemaDefinition<T extends Record<string, unknown>>(struct: SchemaDefinition<T>, littleEndian?: boolean): Model<T>;
    /**
     * Serialize an object or an array of objects defined by this Model's schema into an ArrayBuffer.
     * @param data The object or array of objects to be serialized.
     */
    toBuffer(data: SchemaData<T>): ArrayBuffer;
    toBuffer(data: SchemaData<T>, encoding: 'Uint8'): Uint8Array;
    toBuffer(data: SchemaData<T>, encoding: 'Uint16'): Uint16Array;
    toBuffer(data: SchemaData<T>, encoding: 'Uint32'): Uint32Array;
    toBuffer(data: SchemaData<T>, encoding: 'Int8'): Int8Array;
    toBuffer(data: SchemaData<T>, encoding: 'Int16'): Int16Array;
    toBuffer(data: SchemaData<T>, encoding: 'Int32'): Int32Array;
    toBuffer(data: SchemaData<T>, encoding: 'Float32'): Float32Array;
    toBuffer(data: SchemaData<T>, encoding: 'Float64'): Float64Array;
    toBuffer(data: SchemaData<T>, encoding: 'BigInt64'): BigInt64Array;
    toBuffer(data: SchemaData<T>, encoding: 'BigUint64'): BigUint64Array;
    /**
     * Deserialize an ArrayBuffer to reconstruct the original object or array of objects defined by
     * the schema of this Model.
     * @param buffer The ArrayBuffer to be deserialized.
     */
    fromBuffer(buffer: ArrayBuffer | ArrayBufferView): SchemaData<T>;
    /**
     * Serialize data that adheres to the provided object structure.
     * @param data Data to be serialized.
     * @param struct Object structure in the schema definition.
     */
    protected serialize(data: Record<string, any>, struct: SchemaMap): void;
    /**
     * Deserialize data from the ArrayBuffer that adheres to the provided object structure.
     * @param struct Object structure in the schema definition.
     */
    /**
     * Deserialize data from the ArrayBuffer that adheres to the provided object structure.
     * @param struct Object structure in the schema definition.
     */
    protected deserialize(struct: SchemaMap): Record<string, any>;
}
