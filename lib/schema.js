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
     * @param sort option to sort fields alphabetically. Why ? no idea. But default is true.
     */
    constructor(struct, sort = true) {
        this.struct = sort ? Schema.definition(struct) : struct;
    }
    /**
     * Create a SchemaDefinition without creating a Schema instance.
     * @param obj Object defining the schema.
     */
    static definition(obj) {
        return this.sortStruct(obj);
    }
    /**
     * Sort and validate the structure of the SchemaDefinition.
     * @param struct The SchemaDefinition structure to be sorted.
     */
    static sortStruct(struct) {
        const keys = Object.keys(struct);
        if (keys.length <= 1) {
            // sort() does not run if there is only 1 array element, ensure that element is validated
            this.getSortPriority(struct[keys[0]]);
        }
        // Find the type of each property of the struct
        const sortedKeys = keys.sort((a, b) => {
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
        const sortedStruct = {};
        for (const key of sortedKeys) {
            const value = struct[key];
            // Object
            if (utils_1.isObject(value) && !utils_1.isBufferView(value)) {
                sortedStruct[key] = this.sortStruct(value);
            }
            // Schema, BufferView, Array
            else {
                sortedStruct[key] = value;
            }
        }
        return sortedStruct;
    }
    /**
     * Returns the priority index of the entity based on its type, in order:
     * `BufferView<number>`, `BufferView<number>[]`, `BufferView<string>`, `BufferView<string>[]`,
     * `Object`, `Schema`, `Schema[]`
     * @param item Entity to determine sort priority.
     */
    static getSortPriority(item) {
        if (utils_1.isBufferView(item)) {
            if (item.type === 'String') {
                return 2;
            }
            return 0;
        }
        if (item instanceof Schema) {
            return 5;
        }
        if (Array.isArray(item)) {
            if (utils_1.isBufferView(item[0])) {
                if (item[0].type === 'String') {
                    return 3;
                }
                return 1;
            }
            if (item[0] instanceof Schema) {
                return 6;
            }
        }
        if (utils_1.isObject(item)) {
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