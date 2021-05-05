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
exports.saveChatToGroup = exports.addUserToGroup = exports.createGroup = void 0;
const response_1 = require("../services/response");
const index_1 = __importDefault(require("../models/users/index"));
const index_2 = __importDefault(require("../models/messages/index"));
const index_3 = __importDefault(require("../models/group/index"));
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const GROUP_NAME = req.body.GROUP_NAME;
    if (!GROUP_NAME)
        return response_1.errorResponse(res, 422, 'GROUP_NAME is required!');
    try {
        const data = {
            GROUP_NAME: GROUP_NAME,
            ADMINS: [{ ADMIN_ID: req.user._id }]
        };
        const SAVE_GROUP = yield index_3.default.saveGroup(data);
        const USER_DATA = yield index_1.default.findUser({ _id: req.user._id });
        USER_DATA.Groups.push({ groupId: SAVE_GROUP._id });
        yield index_1.default.updateUser(USER_DATA._id, USER_DATA);
        return response_1.succesResponse(res, 200, 'create gropu successfully!');
    }
    catch (error) {
        return response_1.errorResponse(res, 422, error);
    }
});
exports.createGroup = createGroup;
const addUserToGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const GROUP_ID = req.params.GROUP_ID;
    const USER_ID = req.body.USER_ID;
    if (!GROUP_ID)
        return response_1.errorResponse(res, 422, 'GROUP_NAME is required!');
    if (!USER_ID)
        return response_1.errorResponse(res, 422, 'USER_ID is required!');
    try {
        const GROUP_DATA = yield index_3.default.getGroup({ _id: GROUP_ID });
        if (!GROUP_DATA)
            return response_1.errorResponse(res, 422, 'group id is invalid!');
        const USER_DATA = yield index_1.default.findUser({ _id: USER_ID });
        if (!USER_DATA)
            return response_1.errorResponse(res, 422, 'Invalid given USER_ID!');
        const isEXIST = yield isAdminExist(req.user._id, GROUP_DATA.ADMINS);
        if (!isEXIST) {
            return response_1.errorResponse(res, 422, 'only group admin can add users in group!');
        }
        else {
            GROUP_DATA.USERS.push({ USER_ID: USER_ID });
            yield index_3.default.updateGroup(GROUP_ID, GROUP_DATA);
            USER_DATA.Groups.push({ groupId: GROUP_ID });
            yield index_1.default.updateUser(USER_ID, USER_DATA);
            return response_1.succesResponse(res, 200, 'add user to group successfully!');
        }
    }
    catch (error) {
        return response_1.errorResponse(res, 422, error);
    }
});
exports.addUserToGroup = addUserToGroup;
const saveChatToGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const GROUP_ID = req.params.GROUP_ID;
    const MESSAGE = req.body.MESSAGE;
    if (!GROUP_ID)
        return response_1.errorResponse(res, 422, 'GROUP_NAME is required!');
    if (!MESSAGE)
        return response_1.errorResponse(res, 422, ' MESSAGE is required!');
    try {
        const GROUP_DATA = yield index_3.default.getGroup({ _id: GROUP_ID });
        if (!GROUP_DATA)
            return response_1.errorResponse(res, 422, 'group id is invalid!');
        const USER_DATA = yield index_1.default.findUser({ _id: req.user._id });
        const isEXIST = yield isUserExistInGroup(GROUP_ID, USER_DATA.Groups);
        if (!isEXIST) {
            return response_1.errorResponse(res, 422, 'you are not member of this group');
        }
        else {
            const data = {
                from: req.user._id,
                to: GROUP_ID,
                text: MESSAGE
            };
            yield index_2.default.saveChat(data);
            return response_1.succesResponse(res, 200, 'message sand to group successfully!');
        }
    }
    catch (error) {
        return response_1.errorResponse(res, 422, error);
    }
});
exports.saveChatToGroup = saveChatToGroup;
function isAdminExist(ID, ADMINS) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < ADMINS.length; i++) {
            if (ID == ADMINS[i].ADMIN_ID) {
                return true;
            }
            if (i == ADMINS.length - 1)
                return false;
        }
    });
}
function isUserExistInGroup(ID, GROUPS) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < GROUPS.length; i++) {
            if (ID == GROUPS[i].groupId) {
                return true;
            }
            if (i == GROUPS.length - 1)
                return false;
        }
    });
}
//# sourceMappingURL=group.js.map