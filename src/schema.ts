import {BufferViewOrSchema, SchemaDefinition, SchemaMap} from './types';
import {isObject, isBufferView} from './utils';

/**
 * The Schema class provides an API for creating definitions.
 */
export class Schema<T extends Record<string, unknown> = Record<string, unknown>> {
  /**
   * Map that contains references to all Schema instances.
   */
  public static readonly instances = new Map<number, Schema>();
  /**
   * Id of the schema.
   */
  // public readonly id: number;
  /**
   * Schema definition reference.
   */
  public readonly struct: SchemaMap;

  /**
   * Create a new Schema instance.
   * @param name Unique name of the Schema.
   * @param struct SchemaDefinition structure of the Schema.
   */
  public constructor(struct: SchemaDefinition<T> | SchemaMap) {
    this.struct = (struct instanceof Map) ? struct : Schema.definition(struct);
  }

  /**
   * Create a SchemaDefinition without creating a Schema instance.
   * @param obj Object defining the schema.
   */
  public static definition<T>(obj: SchemaDefinition<T>): SchemaMap {
    return this.sortStruct(obj);
  }

  /**
   * Sort and validate the structure of the SchemaDefinition.
   * @param struct The SchemaDefinition structure to be sorted.
   */
  protected static sortStruct<T extends Record<string, any>>(struct: T): SchemaMap {
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

    const sortedStruct = new Map();
    for (const key of sortedKeys) {
      const value = struct[key];
      // Object
      if (isObject(value) && !isBufferView(value)) {
        sortedStruct.set(key, this.sortStruct(value));
      }
      // Schema, BufferView, Array
      else {
        sortedStruct.set(key, value);
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
  protected static getSortPriority(item: BufferViewOrSchema): number {
    if (isBufferView(item)) {
      if (item.type === 'String') {
        return 2;
      }
      return 0;
    }
    if (item instanceof Schema) {
      return 5;
    }
    if (Array.isArray(item)) {
      if (isBufferView(item[0])) {
        if (item[0].type === 'String') {
          return 3;
        }
        return 1;
      }
      if (item[0] instanceof Schema) {
        return 6;
      }
    }
    if (isObject(item)) {
      return 4;
    }
    throw new Error(`Unsupported data type in schema definition: ${item}`);
  }
}
