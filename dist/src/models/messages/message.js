"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let Schema = mongoose_1.default.Schema;
// message schema in conversation
let messageSchema = new Schema({
    from: { type: String },
    to: { type: String },
    text: { type: String },
    isSeen: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('message', messageSchema);
//# sourceMappingURL=message.js.map