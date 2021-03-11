import { BufferViewOrSchema, SchemaDefinition } from './types';
/**
 * The Schema class provides an API for creating definitions.
 */
export declare class Schema<T extends Record<string, unknown> = Record<string, unknown>> {
    /**
     * Map that contains references to all Schema instances.
     */
    static readonly instances: Map<number, Schema<Record<string, unknown>>>;
    /**
     * Id of the schema.
     */
    /**
     * Schema definition reference.
     */
    readonly struct: SchemaDefinition<Readonly<T>>;
    /**
     * Create a new Schema instance.
     * @param name Unique name of the Schema.
     * @param struct SchemaDefinition structure of the Schema.
     */
    constructor(struct: SchemaDefinition<T>);
    /**
     * Create a SchemaDefinition without creating a Schema instance.
     * @param obj Object defining the schema.
     */
    static definition<T>(obj: SchemaDefinition<T>): SchemaDefinition<Readonly<T>>;
    /**
     * Sort and validate the structure of the SchemaDefinition.
     * @param struct The SchemaDefinition structure to be sorted.
     */
    protected static sortStruct<T extends Record<string, any>>(struct: T): T;
    /**
     * Returns the priority index of the entity based on its type, in order:
     * `BufferView<number>`, `BufferView<number>[]`, `BufferView<string>`, `BufferView<string>[]`,
     * `Object`, `Schema`, `Schema[]`
     * @param item Entity to determine sort priority.
     */
    protected static getSortPriority(item: BufferViewOrSchema): number;
}
