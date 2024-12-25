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
exports.acceptOrDeleteController = acceptOrDeleteController;
const db_1 = require("../db");
const utils_1 = require("../utils");
function acceptOrDeleteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const isAccept = req.body.isAccept;
        const senderId = req.body.senderId;
        const ownerId = req.body._id;
        const socketId = yield (0, utils_1.randomString)();
        if (isAccept) {
            try {
                let friend = yield db_1.friendsModel.findOne({
                    userId: ownerId,
                });
                if (!friend) {
                    yield db_1.friendsModel.create({
                        userId: ownerId,
                        allFriend: []
                    });
                }
                if (!(friend === null || friend === void 0 ? void 0 : friend.allFriend.includes(senderId))) {
                    friend === null || friend === void 0 ? void 0 : friend.allFriend.push(senderId);
                    yield (friend === null || friend === void 0 ? void 0 : friend.save());
                    yield db_1.WebSocketIdModel.create({
                        userId: [senderId, ownerId],
                        roomId: socketId
                    });
                }
                if (friend === null || friend === void 0 ? void 0 : friend.allFriend.includes(senderId)) {
                    // removing the request  from the RequestRecievedb after accepting it 
                    let userRequest = yield db_1.RequestRecieveModel.findOne({
                        userId: ownerId
                    });
                    if (userRequest === null || userRequest === void 0 ? void 0 : userRequest.requestRecieve.includes(senderId)) {
                        userRequest.requestRecieve.pull(senderId);
                        yield userRequest.save();
                    }
                    // removing the request  from the RequestSenddb after accepting it 
                    let senderRequest = yield db_1.RequestSendModel.findOne({
                        userId: senderId
                    });
                    if (senderRequest === null || senderRequest === void 0 ? void 0 : senderRequest.requestSent.includes(ownerId)) {
                        senderRequest.requestSent.pull(ownerId);
                        yield senderRequest.save();
                    }
                    res.status(200).json({
                        message: "reqeust accepted"
                    });
                    return;
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({
                    message: "internal server error"
                });
            }
        }
        else {
            try {
                // removing the request  from the RequestRecievedb after accepting it 
                let userRequest = yield db_1.RequestRecieveModel.findOne({
                    userId: ownerId
                });
                if (userRequest === null || userRequest === void 0 ? void 0 : userRequest.requestRecieve.includes(senderId)) {
                    userRequest.requestRecieve.pull(senderId);
                    yield userRequest.save();
                }
                // removing the request  from the RequestSenddb after accepting it 
                let senderRequest = yield db_1.RequestSendModel.findOne({
                    userId: senderId
                });
                if (senderRequest === null || senderRequest === void 0 ? void 0 : senderRequest.requestSent.includes(ownerId)) {
                    senderRequest.requestSent.pull(ownerId);
                    yield senderRequest.save();
                }
                res.status(200).json({
                    message: "reqeust deleted"
                });
                return;
            }
            catch (err) {
                console.log(err);
                res.status(500).json({
                    message: "internal server error"
                });
            }
        }
    });
}
