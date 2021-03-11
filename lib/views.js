"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolean = exports.string = exports.float64 = exports.float32 = exports.uint64 = exports.int64 = exports.uint32 = exports.uint16 = exports.uint8 = exports.int32 = exports.int16 = exports.int8 = void 0;
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
/**
 * Creates a schema representation for a signed integer value.
 * @param type Bit length of the integer.
 */
const int = (type) => ({
    type: `Int${type}`,
    bytes: type === 8 ? 1 : type === 16 ? 2 : 4,
});
/**
 * `int8`: [-128, 127] (1 byte)
 */
exports.int8 = int(8);
/**
 * `int16`: [-32768, 32767] (2 bytes)
 */
exports.int16 = int(16);
/**
 * `int32`: [-2147483648, 2147483647] (4 bytes)
 */
exports.int32 = int(32);
/**
 * Creates a schema representation for an unsigned integer value.
 * @param type Bit length of the integer.
 */
const uint = (type) => ({
    type: `Uint${type}`,
    bytes: type === 8 ? 1 : type === 16 ? 2 : 4,
});
/**
 * `uint8`: [0, 255] (1 byte)
 */
exports.uint8 = uint(8);
/**
 * `uint16`: [0, 65535] (2 bytes)
 */
exports.uint16 = uint(16);
/**
 * `uint32`: [0, 4294967295] (4 bytes)
 */
exports.uint32 = uint(32);
/**
 * Creates a schema representation for a BigInteger value.
 * @param signed Control whether the bigint is signed or unsigned.
 */
const bigint = (signed) => ({
    type: `Big${signed ? 'Int' : 'Uint'}64`,
    bytes: 8,
});
/**
 * `int64`: [-2^63, 2^63-1] (8 bytes)
 */
exports.int64 = bigint(true);
/**
 * `uint64`: [0, 2^64-1] (8 bytes)
 */
exports.uint64 = bigint(false);
/**
 * Creates a schema representation for a floating-point value.
 * @param type Bit length of the float.
 */
const float = (type) => ({
    type: `Float${type}`,
    bytes: type === 32 ? 4 : 8,
});
/**
 * `float32`: [1.2×10-38, 3.4×1038] (7 significant digits) (4 bytes)
 */
exports.float32 = float(32);
/**
 * `float64`: [5.0×10-324, 1.8×10308] (16 significant digits) (8 bytes)
 */
exports.float64 = float(64);
/**
 * `string`: UTF-8 encoding (variable byte length of Uint8Array)
 */
exports.string = {
    type: 'String',
    bytes: 1,
};
/**
 * `boolean`: True (1) and false (0) (1 byte)
 */
exports.boolean = {
    type: 'Boolean',
    bytes: 1,
};
//# sourceMappingURL=views.js.map