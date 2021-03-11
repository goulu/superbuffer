import type { BufferView } from './types';
/**
 * `int8`: [-128, 127] (1 byte)
 */
export declare const int8: BufferView<number>;
/**
 * `int16`: [-32768, 32767] (2 bytes)
 */
export declare const int16: BufferView<number>;
/**
 * `int32`: [-2147483648, 2147483647] (4 bytes)
 */
export declare const int32: BufferView<number>;
/**
 * `uint8`: [0, 255] (1 byte)
 */
export declare const uint8: BufferView<number>;
/**
 * `uint16`: [0, 65535] (2 bytes)
 */
export declare const uint16: BufferView<number>;
/**
 * `uint32`: [0, 4294967295] (4 bytes)
 */
export declare const uint32: BufferView<number>;
/**
 * `int64`: [-2^63, 2^63-1] (8 bytes)
 */
export declare const int64: BufferView<bigint>;
/**
 * `uint64`: [0, 2^64-1] (8 bytes)
 */
export declare const uint64: BufferView<bigint>;
/**
 * `float32`: [1.2×10-38, 3.4×1038] (7 significant digits) (4 bytes)
 */
export declare const float32: BufferView<number>;
/**
 * `float64`: [5.0×10-324, 1.8×10308] (16 significant digits) (8 bytes)
 */
export declare const float64: BufferView<number>;
/**
 * `string`: UTF-8 encoding (variable byte length of Uint8Array)
 */
export declare const string: BufferView<string>;
/**
 * `boolean`: True (1) and false (0) (1 byte)
 */
export declare const boolean: BufferView<boolean>;
