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
exports.usersController = usersController;
const db_1 = require("../db");
function usersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.body._id;
            const requestSent = yield db_1.RequestSendModel.findOne({ userId });
            const sentUserIds = (requestSent === null || requestSent === void 0 ? void 0 : requestSent.requestSent) || [];
            const requestRecieve = yield db_1.RequestRecieveModel.findOne({ userId });
            const receivedUserIds = (requestRecieve === null || requestRecieve === void 0 ? void 0 : requestRecieve.requestRecieve) || [];
            const actualFriends = yield db_1.friendsModel.findOne({ userId });
            const friendsId = (actualFriends === null || actualFriends === void 0 ? void 0 : actualFriends.allFriend) || [];
            const excludedUserIds = [...sentUserIds, ...receivedUserIds, ...friendsId, userId];
            // Fetch all users except the one with the userId from the token
            const otherUsers = yield db_1.userModel.find({ _id: { $nin: excludedUserIds } }, 'userName _id' // Fetch only userName and _id fields
            );
            // Respond with the formatted data
            res.status(200).json({
                otherUsers,
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
