"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChat = exports.saveChatOneToOne = exports.addFriend = exports.userLogin = exports.userSignup = void 0;
const response_1 = require("../services/response");
const index_1 = __importDefault(require("../models/users/index"));
const index_2 = __importDefault(require("../models/messages/index"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const group_1 = __importDefault(require("../models/group"));
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { body: { data: { name, email, password } }, } = req;
    const data = req.body.data;
    if (!name)
        return response_1.errorResponse(res, 422, 'Data is required!');
    if (!password)
        return response_1.errorResponse(res, 422, 'Password is required!');
    if (!email)
        return response_1.errorResponse(res, 422, 'email is required!');
    try {
        const userData = yield index_1.default.findUser({ email: email });
        if (userData)
            return response_1.errorResponse(res, 422, 'Email already exist!');
        const saveUserData = yield index_1.default.saveUser(data);
        return response_1.succesResponse(res, 200, saveUserData);
    }
    catch (error) {
        return response_1.errorResponse(res, 422, error.message);
    }
});
exports.userSignup = userSignup;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { body: { data }, } = req;
    if (!data.email)
        return response_1.errorResponse(res, 422, 'Email is required!');
    if (!data.password)
        return response_1.errorResponse(res, 422, 'Password is required!');
    console.log();
    try {
        let userData = yield index_1.default.findUser({ email: data.email });
        if (!userData)
            return response_1.errorResponse(res, 422, 'user not exist!');
        if (userData.password !== data.password)
            return response_1.errorResponse(res, 422, 'password not match');
        const payload = {
            email: userData.email,
            id: userData._id,
            role: "User"
        };
        const friendList = yield getFriendList(userData.Friends);
        const groopList = yield getGroupList(userData.Groups);
        let token = yield jsonwebtoken_1.default.sign(payload, 'hgsdyugsugdcuysfyt', { expiresIn: '24hr' });
        return response_1.succesResponse(res, 200, { token: token, Friends: friendList, Groups: groopList });
    }
    catch (error) {
        return response_1.errorResponse(res, 422, error.message);
    }
});
exports.userLogin = userLogin;
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    if (!email)
        return response_1.errorResponse(res, 422, 'email is required!');
    try {
        const friendData = yield index_1.default.findUser({ email: email });
        if (!friendData)
            return response_1.errorResponse(res, 422, "user not exist!");
        const userData = yield index_1.default.findUser({ email: req.user.email });
        const isExist = yield isFriendExist(friendData._id, userData.Friends);
        if (!isExist) {
            userData.Friends.push({ friendId: friendData._id, isFriend: true });
            friendData.Friends.push({ friendId: req.user._id });
            yield index_1.default.updateUser(userData._id, userData);
            yield index_1.default.updateUser(friendData._id, friendData);
            return response_1.succesResponse(res, 200, 'add friend successfully!');
        }
        else {
            return response_1.errorResponse(res, 422, 'already exist this person in your friend list!');
        }
    }
    catch (error) {
        return response_1.errorResponse(res, 422, error.message);
    }
});
exports.addFriend = addFriend;
const saveChatOneToOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!req.body.message)
            return response_1.errorResponse(res, 422, 'message is require!');
        if (!id)
            return response_1.errorResponse(res, 422, 'id message is require!');
        const data = {
            from: req.user._id,
            to: id,
            text: req.body.message
        };
        yield index_2.default.saveChat(data);
        return response_1.succesResponse(res, 200, 'message sand successfully!');
    }
    catch (error) {
        return response_1.errorResponse(res, 422, error.message);
    }
});
exports.saveChatOneToOne = saveChatOneToOne;
const getChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toId = req.params.toId;
    const fromId = req.user._id;
    if (!toId)
        response_1.errorResponse(res, 422, 'to id is required!');
    if (!fromId)
        response_1.errorResponse(res, 422, 'to id is required!');
    try {
        const chatData = yield index_2.default.fetchChat(toId, fromId);
        return response_1.succesResponse(res, 200, chatData);
    }
    catch (error) {
        return response_1.errorResponse(res, 422, error.message);
    }
});
exports.getChat = getChat;
// export const aproveRequest = async (req:any, res:any)=>{
//     try {
//         return succesResponse(res, 200, '')        
//     } catch (error) {
//         return errorResponse(res, 422, error.message)
//     }
// }
/* function for get friends list */
function getFriendList(friends) {
    return __awaiter(this, void 0, void 0, function* () {
        if (friends.length > 0) {
            const list = [];
            for (let i = 0; i < friends.length; i++) {
                let friendData = yield index_1.default.findUser({ _id: friends[i].friendId });
                list.push({ id: friendData._id, name: friendData.name, email: friendData.email, isFriend: friends[i].isFriend });
                if (i === friends.length - 1) {
                    return list;
                }
            }
        }
        else {
            return [];
        }
    });
}
/* function for get groups list */
function getGroupList(groups) {
    return __awaiter(this, void 0, void 0, function* () {
        if (groups.length > 0) {
            const list = [];
            for (let i = 0; i < groups.length; i++) {
                let groupData = yield group_1.default.getGroup({ _id: groups[i].groupId });
                list.push({ id: groupData._id, name: groupData.GROUP_NAME });
                if (i === groups.length - 1) {
                    return list;
                }
            }
        }
        else {
            return [];
        }
    });
}
function isFriendExist(id, friends) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < friends.length; i++) {
            if (id == friends[i].friendId) {
                return true;
            }
            if (i == friends.length - 1)
                return false;
        }
    });
}
//# sourceMappingURL=user.js.map