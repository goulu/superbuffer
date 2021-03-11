"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBufferView = exports.isObject = void 0;
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
 * @param value
 */
function isBufferView(value) {
    return value && typeof value.type === 'string' && typeof value.bytes === 'number';
}
exports.isBufferView = isBufferView;
//# sourceMappingURL=utils.js.map