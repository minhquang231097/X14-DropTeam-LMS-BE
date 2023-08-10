"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpResponseData {
    constructor(message, statusCode, data = null) {
        Object.defineProperty(this, "statusCode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this.statusCode = statusCode;
        this.message = message;
        this.data = data || null;
    }
}
exports.default = HttpResponseData;
//# sourceMappingURL=httpResponseData.js.map