"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let Schema = mongoose_1.default.Schema;
// message schema in conversation
let USER = new Schema({
    USER_ID: { type: String },
    createdAt: { type: Date, default: Date.now },
});
// message schema in conversation
let ADMIN = new Schema({
    ADMIN_ID: { type: String },
    createdAt: { type: Date, default: Date.now },
});
let GROUP_SCHEMA = new Schema({
    GROUP_NAME: { type: String },
    USERS: [USER],
    ADMINS: [ADMIN],
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('group', GROUP_SCHEMA);
//# sourceMappingURL=group.js.map