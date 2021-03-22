import type { BufferView, Serializable } from './types';
/**
 * The BufferManager class provides an API for reading and writing to an ArrayBuffer via
 * DataViews while tracking the current byte offset and automatically handling string encoding.
 */
export declare class BufferManager {
    /**
     * Max buffer size for a serialized object. Default: 1 megabyte.
     */
    readonly maxByteSize: number;
    /**
     * Internal ArrayBuffer reference.
     */
    protected _buffer: ArrayBuffer;
    /**
     * Internal DataView reference.
     */
    protected _dataView: DataView;
    /**
     * Current byte position in the DataView.
     */
    protected _offset: number;
    /**
     * Internal TextEncoder reference.
     */
    protected _textEncoder: TextEncoder;
    /**
     * Internal TextDecoder reference.
     */
    protected _textDecoder: TextDecoder;
    /**
     * Internal Uint8Array representation of the DataView.
     */
    protected _uint8Array: Uint8Array;
    /**
     * Get the current byte offset of the buffer.
     */
    get offset(): number;
    protected _littleEndian: boolean;
    /**
     * Create a new BufferManager instance.
     * @param bufferSize The maximum size of the internal ArrayBuffer.
     */
    constructor(bufferSize?: number, littleEndian?: boolean);
    /**
     * Refresh this Model's internal buffer and DataView before toBuffer is called.
     * @param newBuffer Specific ArrayBuffer instance, otherwise a default will be used.
     */
    refresh(newBuffer?: ArrayBuffer): void;
    /**
     * Copy the contents of the internal ArrayBuffer (which may contain trailing empty sections)
     * into a new ArrayBuffer with no empty bytes.
     */
    finalize(): ArrayBuffer;
    /**
     * Append data to the internal DataView buffer.
     * @param bufferView BufferView to define the type appended.
     * @param data Data to be appended to the DataView.
     */
    append(bufferView: BufferView, data: Serializable): void;
    /**
     * Read the DataView at the current byte offset according to the BufferView type, and
     * increment the offset if the read was successful.
     * @param bufferView BufferView to define the type read.
     */
    read(bufferView: BufferView): Serializable;
    read(bufferView: BufferView<string>): string;
    read(bufferView: BufferView<number>): number;
    read(bufferView: BufferView<bigint>): bigint;
}
