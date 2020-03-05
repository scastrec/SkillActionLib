"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUrlHttps = (url) => {
    if (url && url.startsWith('http://')) {
        return url.replace('http://', 'https://');
    }
    return url;
};
//# sourceMappingURL=UrlUtils.js.map