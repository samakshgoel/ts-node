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
const user_1 = __importDefault(require("./user"));
let userModule = {};
userModule.userType = user_1.default.modelName;
userModule.findUser = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.findOne(data);
    });
};
userModule.saveUser = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new user_1.default(data).save();
    });
};
userModule.updateUser = function (id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.updateOne({ _id: id }, { $set: data });
    });
};
exports.default = userModule;
//# sourceMappingURL=index.js.map