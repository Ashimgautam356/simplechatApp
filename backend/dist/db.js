"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestRecieveModel = exports.RequestSendModel = exports.friendsModel = exports.userRoomModel = exports.userModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, require: true, unique: true },
    userName: { type: String, require: true },
    password: { type: String, require: true }
});
const userRooms = new mongoose_1.default.Schema({
    userId: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Users', require: true, unique: true },
    roomId: { type: String, require: true, unique: true }
});
const friendsSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Users', require: true },
    friends: [{ type: mongoose_1.Schema.Types.ObjectId, default: [], ref: 'Users' }],
});
const RequestSendSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: 'Users', require: true, unique: true },
    requestSent: [{ type: mongoose_1.Types.ObjectId, default: [], ref: 'Users' }]
});
const RequestRecieveSchem = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: 'Users', require: true, unique: true },
    requestRecieve: [{ type: mongoose_1.Types.ObjectId, default: [], ref: 'Users' }]
});
exports.userModel = mongoose_1.default.model("Users", userSchema);
exports.userRoomModel = mongoose_1.default.model("Rooms", userRooms);
exports.friendsModel = mongoose_1.default.model("Friends", friendsSchema);
exports.RequestSendModel = mongoose_1.default.model('RequestSend', RequestSendSchema);
exports.RequestRecieveModel = mongoose_1.default.model('RequestRecieve', RequestRecieveSchem);
