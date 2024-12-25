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
exports.signinController = signinController;
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
function signinController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const token = jsonwebtoken_1.default.sign({
                _id: user._id
            }, __1.JWT_SCRETE);
            res.status(200).json({
                message: "login",
                token: token
            });
        }
        catch (err) {
            res.status(500).json({
                message: "internal server error"
            });
        }
    });
}
