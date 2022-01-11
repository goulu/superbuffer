import type { BufferView, TypedArrayName } from './types';
/**
 * Test if an entity is an plain object.
 * @param value Value to be tested.
 */
export declare function isObject<T extends Record<any, any>>(value: any): value is T;
/**
 * Test if an entity is an object that implements the BufferView interface.
 * @param value Value to be tested.
 */
export declare function isBufferView(value: any): value is BufferView;
/**
 * Get the TypedArray constructor based on it's name prefix.
 * @param value Name prefix.
 */
export declare function getTypedArrayByName(value: TypedArrayName): Uint8ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor | Int8ArrayConstructor | Int16ArrayConstructor | Int32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor | BigInt64ArrayConstructor | BigUint64ArrayConstructor;
