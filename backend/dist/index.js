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
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// signup
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.userModel.create({
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password
        });
        res.status(200).json({
            message: "account has been created"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "internal server error"
        });
    }
}));
// login
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield db_1.userModel.findOne({
            email: email,
            password: password
        });
        if (!user) {
            res.status(403).json({
                message: "crediantials invalid"
            });
            return;
        }
        res.status(200).json({
            message: "login"
        });
    }
    catch (err) {
        res.status(500).json({
            message: "internal server error"
        });
    }
}));
// joinnig the room
app.post('/api/v1/joinRoom', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.userRoomModel.create({
            roomId: req.body.roomId,
            userId: []
        });
    }
    catch (err) {
        res.status(500).json({
            message: "internal server error"
        });
    }
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb+srv://ashim:ashim12345@taskmanagerproject.zdfcogy.mongodb.net/simpleChatApp");
        app.listen(3000, () => {
            console.log("server is ready!!!!!!!!");
        });
    });
}
main();
