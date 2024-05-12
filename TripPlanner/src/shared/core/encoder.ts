import { HttpUrlEncodingCodec } from "@angular/common/http";

export class CustomHttpUrlEncodingCodec extends HttpUrlEncodingCodec {
    override encodeKey(k: string): string {
        return super.encodeKey(k)
            .replace(/\+/gi, '%2B')
    }
    override encodeValue(v: string): string {
        return super.encodeValue(v)
            .replace(/\+/gi, '%2B')
    }
}