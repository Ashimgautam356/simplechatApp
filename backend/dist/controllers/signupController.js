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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = signupController;
const db_1 = require("../db");
function signupController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isUserExist = yield db_1.userModel.findOne({
                email: req.body.email
            });
            if (isUserExist) {
                res.status(411).json({
                    message: "user already exists"
                });
                return;
            }
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
    });
}
