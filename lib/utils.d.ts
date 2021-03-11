import type { BufferView } from './types';
/**
 * Test if an entity is an plain object.
 * @param value Value to be tested.
 */
export declare function isObject<T extends Record<any, any>>(value: any): value is T;
/**
 * Test if an entity is an object that implements the BufferView interface.
 * @param value
 */
export declare function isBufferView(value: any): value is BufferView;
