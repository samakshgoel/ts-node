"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const authorization_1 = require("../services/authorization");
const roles_1 = __importDefault(require("../services/roles"));
const route = express_1.Router();
route.post('/signup', user_1.userSignup);
route.post('/login', user_1.userLogin);
route.post('/add-friend', authorization_1.authorize(roles_1.default.User), user_1.addFriend);
route.post('/save-chat/:id', authorization_1.authorize(roles_1.default.User), user_1.saveChatOneToOne);
route.get('/get-chat/:toId', authorization_1.authorize(roles_1.default.User), user_1.getChat);
// route.post('/forgot-password', forgotPassword)
// route.post('/update-Password', updatePassword)
// route.get('/user-post', authorize([roles.User,roles.Viewer]), userPost)
exports.default = route;
//# sourceMappingURL=user.js.map