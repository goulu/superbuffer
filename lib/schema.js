"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const utils_1 = require("./utils");
/**
 * The Schema class provides an API for creating definitions.
 */
class Schema {
    /**
     * Create a new Schema instance.
     * @param name Unique name of the Schema.
     * @param struct SchemaDefinition structure of the Schema.
     */
    constructor(struct) {
        this.struct = struct instanceof Map ? struct : Schema.definition(struct);
    }
    /**
     * Create a SchemaDefinition without creating a Schema instance.
     * @param obj Object defining the schema.
     */
    static definition(obj) {
        return this.getStruct(obj, false); // do not sort
    }
    /**
     * Sort and validate the structure of the SchemaDefinition.
     * @param struct The SchemaDefinition structure to be sorted.
     * @paaram sort if fields must be sorted (legacy DanielHZhang)
     */
    static getStruct(struct, sort = false) {
        let keys = Object.keys(struct);
        if (sort) {
            if (keys.length <= 1) {
                // sort() does not run if there is only 1 array element, ensure that element is validated
                this.getSortPriority(struct[keys[0]]);
            }
            // Find the type of each property of the struct
            keys = keys.sort((a, b) => {
                const indexA = this.getSortPriority(struct[a]);
                const indexB = this.getSortPriority(struct[b]);
                // Same type, sort alphabetically by key
                if (indexA === indexB) {
                    return a < b ? -1 : 1;
                }
                // Different type, sort by returned index
                else {
                    return indexA < indexB ? -1 : 1;
                }
            });
        }
        const res = new Map();
        for (const key of keys) {
            const value = struct[key];
            // Object
            if ((0, utils_1.isObject)(value) && !(0, utils_1.isBufferView)(value)) {
                res.set(key, this.getStruct(value, sort));
            }
            // Schema, BufferView, Array
            else {
                res.set(key, value);
            }
        }
        return res;
    }
    /**
     * Returns the priority index of the entity based on its type, in order:
     * `BufferView<number>`, `BufferView<number>[]`, `BufferView<string>`, `BufferView<string>[]`,
     * `Object`, `Schema`, `Schema[]`
     * @param item Entity to determine sort priority.
     */
    static getSortPriority(item) {
        if ((0, utils_1.isBufferView)(item)) {
            if (item.type === 'String') {
                return 2;
            }
            return 0;
        }
        if (item instanceof Schema) {
            return 5;
        }
        if (Array.isArray(item)) {
            if ((0, utils_1.isBufferView)(item[0])) {
                if (item[0].type === 'String') {
                    return 3;
                }
                return 1;
            }
            if (item[0] instanceof Schema) {
                return 6;
            }
        }
        if ((0, utils_1.isObject)(item)) {
            return 4;
        }
        throw new Error(`Unsupported data type in schema definition: ${item}`);
    }
}
exports.Schema = Schema;
/**
 * Map that contains references to all Schema instances.
 */
Schema.instances = new Map();
//# sourceMappingURL=schema.js.map