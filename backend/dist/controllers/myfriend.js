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
exports.myfriend = myfriend;
const db_1 = require("../db");
function myfriend(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.body._id;
            const friends = yield db_1.friendsModel.findOne({ userId: userId }).populate('allFriend', 'userName email');
            res.status(200).json({
                message: "success",
                friends: friends
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
