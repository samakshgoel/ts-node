"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.succesResponse = exports.errorResponse = void 0;
const errorResponse = (res, status, message) => {
    return res.status(status).send({ code: status, status: 'Failure', message: message });
};
exports.errorResponse = errorResponse;
const succesResponse = (res, status, data) => {
    return res.status(status).send({ code: status, status: 'Success', data: data });
};
exports.succesResponse = succesResponse;
//# sourceMappingURL=response.js.map