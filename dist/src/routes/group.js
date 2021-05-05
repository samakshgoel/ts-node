"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = require("../services/authorization");
const roles_1 = __importDefault(require("../services/roles"));
const group_1 = require("../controllers/group");
const route = express_1.Router();
route.post('/create-group', authorization_1.authorize(roles_1.default.User), group_1.createGroup);
route.put('/add-user-to-group/:GROUP_ID', authorization_1.authorize(roles_1.default.User), group_1.addUserToGroup);
route.put('/save-chat-to-group/:GROUP_ID', authorization_1.authorize(roles_1.default.User), group_1.saveChatToGroup);
exports.default = route;
//# sourceMappingURL=group.js.map