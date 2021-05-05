"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let Schema = mongoose_1.default.Schema;
// message schema in conversation
let friendSchema = new Schema({
    friendId: { type: String },
    isFriend: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});
// message schema in conversation
let groupSchema = new Schema({
    groupId: { type: String },
    createdAt: { type: Date, default: Date.now },
});
let userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    Friends: [friendSchema],
    Groups: [groupSchema],
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('user', userSchema);
//# sourceMappingURL=user.js.map