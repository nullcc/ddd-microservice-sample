import { Stream } from 'stream';

export const stream2buffer = async (stream: Stream): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>();
    stream.on('data', (chunk) => _buf.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(_buf)));
    stream.on('error', (err) => reject(`error converting stream - ${err}`));
  });
};

export class BufferStream extends Stream.Writable {
  private _buf: Array<Buffer> = Array<Buffer>();

  toBuffer(): Buffer {
    return Buffer.concat(this._buf);
  }

  _write(chunk, enc, done) {
    this._buf.push(chunk);
    process.nextTick(done);
  }
}
