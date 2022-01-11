"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypedArrayByName = exports.isBufferView = exports.isObject = void 0;
/**
 * Test if an entity is an plain object.
 * @param value Value to be tested.
 */
function isObject(value) {
    return typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype;
}
exports.isObject = isObject;
/**
 * Test if an entity is an object that implements the BufferView interface.
 * @param value Value to be tested.
 */
function isBufferView(value) {
    return value && typeof value.type === 'string' && typeof value.bytes === 'number';
}
exports.isBufferView = isBufferView;
/**
 * Get the TypedArray constructor based on it's name prefix.
 * @param value Name prefix.
 */
function getTypedArrayByName(value) {
    switch (value) {
        case 'Uint8':
            return Uint8Array;
        case 'Uint16':
            return Uint16Array;
        case 'Uint32':
            return Uint32Array;
        case 'Int8':
            return Int8Array;
        case 'Int16':
            return Int16Array;
        case 'Int32':
            return Int32Array;
        case 'Float32':
            return Float32Array;
        case 'Float64':
            return Float64Array;
        case 'BigUint64':
            return BigUint64Array;
        case 'BigInt64':
            return BigInt64Array;
        default:
            throw new Error('Invalid buffer encoding type.');
    }
}
exports.getTypedArrayByName = getTypedArrayByName;
//# sourceMappingURL=utils.js.map