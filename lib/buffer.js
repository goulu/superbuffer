"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferManager = void 0;
const views_1 = require("./views");
/**
 * The BufferManager class provides an API for reading and writing to an ArrayBuffer via
 * DataViews while tracking the current byte offset and automatically handling string encoding.
 */
class BufferManager {
    /**
     * Create a new BufferManager instance.
     * @param bufferSize The maximum size of the internal ArrayBuffer.
     */
    constructor(bufferSize, littleEndian) {
        this.maxByteSize = bufferSize !== null && bufferSize !== void 0 ? bufferSize : 1e6;
        this._littleEndian = littleEndian !== null && littleEndian !== void 0 ? littleEndian : false;
        this._offset = 0;
        this._buffer = new ArrayBuffer(this.maxByteSize);
        this._dataView = new DataView(this._buffer);
        this._uint8Array = new Uint8Array(this._buffer);
        this._textEncoder = new TextEncoder();
        this._textDecoder = new TextDecoder();
    }
    /**
     * Get the current byte offset of the buffer.
     */
    get offset() {
        return this._offset;
    }
    /**
     * Refresh this Model's internal buffer and DataView before toBuffer is called.
     * @param newBuffer Specific ArrayBuffer instance, otherwise a default will be used.
     */
    refresh(newBuffer) {
        this._offset = 0;
        if (newBuffer) {
            this._uint8Array.set(new Uint8Array(newBuffer));
        }
    }
    /**
     * Copy the contents of the internal ArrayBuffer (which may contain trailing empty sections)
     * into a new ArrayBuffer with no empty bytes.
     */
    finalize() {
        return this._buffer.slice(0, this._offset);
    }
    /**
     * Append data to the internal DataView buffer.
     * @param bufferView BufferView to define the type appended.
     * @param data Data to be appended to the DataView.
     */
    append(bufferView, data) {
        if (bufferView.type === 'String') {
            this._dataView.setUint8(this._offset, 34); // Wrap in double quotes
            this._offset += views_1.uint8.bytes;
            const encoded = this._textEncoder.encode(data.toString());
            this._uint8Array.set(encoded, this._offset);
            this._offset += encoded.byteLength;
            this._dataView.setUint8(this._offset, 34); // Wrap in double quotes
            this._offset += views_1.uint8.bytes;
            return;
        }
        if (bufferView.type === 'Boolean') {
            this._dataView.setUint8(this._offset, data === true ? 1 : 0);
        }
        else {
            switch (bufferView.type) {
                case 'BigInt64':
                case 'BigUint64': {
                    data = typeof data === 'bigint' ? data : BigInt(data);
                    break;
                }
                case 'Float32':
                case 'Float64': {
                    data = Number(Number(data).toPrecision(bufferView.type === 'Float32' ? 7 : 16));
                    break;
                }
            }
            this._dataView[`set${bufferView.type}`](this._offset, data, this._littleEndian);
        }
        this._offset += bufferView.bytes;
    }
    read(bufferView) {
        let result;
        let newOffset = this._offset + bufferView.bytes;
        // String
        if (bufferView.type === 'String') {
            const startingDoubleQuote = this._uint8Array[this._offset]; // Char code of " is 34
            const endQuoteIndex = this._uint8Array.indexOf(34, this._offset + 1);
            if (startingDoubleQuote !== 34 || endQuoteIndex < this._offset) {
                throw new Error('Buffer contains invalid string.');
            }
            result = this._textDecoder.decode(this._uint8Array.subarray(this._offset + 1, endQuoteIndex));
            newOffset = endQuoteIndex + 1;
        }
        // Boolean
        else if (bufferView.type === 'Boolean') {
            result = Boolean(this._dataView.getUint8(this._offset));
        }
        // Number
        else {
            result = this._dataView[`get${bufferView.type}`](this._offset);
            if (bufferView.type === 'Float32' || bufferView.type === 'Float64') {
                result = Number(Number(result).toPrecision(bufferView.type === 'Float32' ? 7 : 16));
            }
        }
        this._offset = newOffset;
        return result;
    }
}
exports.BufferManager = BufferManager;
//# sourceMappingURL=buffer.js.map