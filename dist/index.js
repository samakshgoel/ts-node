"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose = require("mongoose");
const user_1 = __importDefault(require("./src/routes/user"));
const group_1 = __importDefault(require("./src/routes/group"));
const app = express_1.default();
dotenv_1.default.config();
mongoose.Promise = global.Promise;
// Connecting to the database //
mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    console.log('Successfully connected to the database');
})
    .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(user_1.default);
app.use(group_1.default);
app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
//# sourceMappingURL=index.js.map