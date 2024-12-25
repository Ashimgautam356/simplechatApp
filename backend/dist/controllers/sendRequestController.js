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
exports.sendRequestController = sendRequestController;
const db_1 = require("../db");
function sendRequestController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const friendUserId = req.body.request;
        const senderId = req.body._id;
        try {
            let sender = yield db_1.RequestSendModel.findOne({
                userId: senderId
            });
            if (!sender) {
                sender = yield db_1.RequestSendModel.create({
                    userId: senderId,
                    requestSent: []
                });
            }
            if (!sender.requestSent.includes(friendUserId)) {
                sender.requestSent.push(friendUserId);
                yield sender.save();
            }
            let reciver = yield db_1.RequestRecieveModel.findOne({
                userId: friendUserId
            });
            if (!reciver) {
                reciver = yield db_1.RequestRecieveModel.create({
                    userId: friendUserId,
                    requestRecieve: []
                });
            }
            if (!reciver.requestRecieve.includes(senderId)) {
                reciver.requestRecieve.push(senderId);
                yield reciver.save();
            }
            res.status(200).json({
                message: "request sent"
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
