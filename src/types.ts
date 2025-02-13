import type {Model} from './model';
import type {Schema} from './schema';

/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

/**
 * The string prefix name of a TypedArray.
 */
export type TypedArrayName =
  | 'Uint8'
  | 'Uint16'
  | 'Uint32'
  | 'Int8'
  | 'Int16'
  | 'Int32'
  | 'Float32'
  | 'Float64'
  | 'BigInt64'
  | 'BigUint64';

/**
 * A type that can be serialized into ArrayBuffer.
 */
export type Serializable = string | number | bigint | boolean;

/**
 * Defines a TypedArray within an ArrayBuffer.
 */
export type BufferView<T extends Serializable = Serializable> = {
  readonly type: T extends string
  ? 'String'
  : T extends boolean
  ? 'Boolean'
  : T extends number
  ? 'Uint8' | 'Uint16' | 'Uint32' | 'Int8' | 'Int16' | 'Int32' | 'Float32' | 'Float64'
  : 'BigInt64' | 'BigUint64';
  readonly bytes: number;
};

/**
 * A BufferView, BufferView array, Schema, or Schema array.
 */
export type BufferViewOrSchema = BufferView | [BufferView] | Schema | [Schema];

/**
 * Defines a BufferSchema.
 */
export type SchemaDefinition<T> = {
  [K in keyof T]: T[K] extends BufferViewOrSchema
  ? T[K]
  : T[K] extends Record<string, unknown>
  ? SchemaDefinition<T[K]>
  : never;
};

export type SchemaMap = Map<string, any>;


/**
 * Extracts the plain object representation of the schema definition.
 */
export type SchemaObject<T> = {
  [K in keyof T]: T[K] extends BufferView<infer U>
  ? U
  : T[K] extends BufferView<infer U>[]
  ? U[]
  : T[K] extends Schema<infer U>
  ? SchemaObject<U>
  : T[K] extends Schema<infer U>[]
  ? SchemaObject<U>[]
  : T[K] extends Record<string, unknown>
  ? SchemaObject<T[K]>
  : T[K] extends Map<string, unknown>
  ? SchemaObject<T[K]>
  : never;
};

export type SchemaData<T> = SchemaObject<T> | SchemaObject<T>[];

/**
 * Extract the SchemaDefinition type from a Model.
 */
export type ExtractSchemaDefinition<T> = T extends Model<infer U> ? SchemaDefinition<U> : never;

/**
 * Extract the SchemaObject type from a Model.
 */
export type ExtractSchemaObject<T> = T extends Model<infer U> ? SchemaObject<U> : never;
