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
exports.auth = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({
                message: "token is missing"
            });
            return;
        }
        if (!jsonwebtoken_1.default.verify(String(token), __1.JWT_SCRETE)) {
            res.status(403).json({
                message: "fasdftoken is invalid"
            });
            return;
        }
        const userId = jsonwebtoken_1.default.decode(String(token));
        if (!userId || !userId._id) {
            res.status(403).json({ message: "Token is invalid" });
            return;
        }
        req.body._id = userId._id;
        next();
    });
}
