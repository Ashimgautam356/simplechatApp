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
exports.setupWebSocketServer = setupWebSocketServer;
const ws_1 = require("ws");
const db_1 = require("./db");
const allSocket = new Map();
function setupWebSocketServer(server) {
    const wss = new ws_1.WebSocketServer({ port: 3001 });
    wss.on("connection", (socket) => {
        socket.on("message", (evnt) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const parsedMessage = JSON.parse(evnt);
            let rmId = yield db_1.WebSocketIdModel.findOne({
                roomId: parsedMessage.payload.roomId
            });
            const senderId = parsedMessage.payload.senderId;
            const recieverId = parsedMessage.payload.recieverId;
            if (!rmId) {
                console.log("rmId is null");
                return;
            }
            if (parsedMessage.payload.roomId == rmId.roomId && senderId == rmId.userId.includes(senderId) && recieverId == rmId.userId.includes(recieverId)) {
                const roomId = parsedMessage.payload.roomId;
                if (parsedMessage.type == 'join') {
                    if (!allSocket.has(roomId)) {
                        allSocket.set(roomId, []);
                    }
                    (_a = allSocket.get(roomId)) === null || _a === void 0 ? void 0 : _a.push(socket);
                    console.log("user Connected");
                }
                if (parsedMessage.type == 'chat') {
                    const message = parsedMessage.payload.message;
                    (_b = allSocket.get(roomId)) === null || _b === void 0 ? void 0 : _b.forEach((clientSocket) => {
                        if (clientSocket.readyState == ws_1.WebSocket.OPEN) {
                            clientSocket.send(message);
                        }
                    });
                }
            }
        }));
    });
    console.log("WebSocket server is set up");
    return wss;
}
