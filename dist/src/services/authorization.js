"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const express_jwt_1 = __importDefault(require("express-jwt"));
const index_1 = __importDefault(require("../models/users/index"));
const response_1 = require("./response");
const adminModule = {};
const authorize = (role) => {
    if (typeof role == 'string') {
        role = [role];
    }
    return [
        express_jwt_1.default({ secret: 'hgsdyugsugdcuysfyt', algorithms: ['HS256'] }),
        (req, res, next) => {
            if (role.length && !role.includes(req.user.role)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            switch (req.user.role) {
                case 'User':
                    index_1.default.findUser({ email: req.user.email })
                        .then((user) => {
                        if (user) {
                            if (!user)
                                return response_1.errorResponse(res, 404, 'User Not Found');
                            delete user.password;
                            req.user = user;
                            req.userType = 'User';
                            next();
                        }
                        else {
                            return res.status(404).json({ message: 'User Not Found' });
                        }
                    });
                    break;
                default:
                    return res.status(404).json({ message: 'User Not Found' });
            }
        },
    ];
};
exports.authorize = authorize;
//# sourceMappingURL=authorization.js.map