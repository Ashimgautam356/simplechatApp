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
exports.JWT_SCRETE = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const webSocketserv_1 = require("./webSocketserv");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const entryPoint_1 = require("./routes/entryPoint");
const auth_1 = require("./middleware/auth");
const userEndPoints_1 = require("./routes/userEndPoints");
const usersController_1 = require("./controllers/usersController");
exports.JWT_SCRETE = 'this is the super secrete key';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const currentVersion = '/api/v1';
app.use(`${currentVersion}`, entryPoint_1.entryPoint);
// middle ware
app.use(auth_1.auth);
app.get(`${currentVersion}/users`, usersController_1.usersController);
// sending request 
app.use(`${currentVersion}/user`, userEndPoints_1.userEndPoints);
const server = http_1.default.createServer(app);
(0, webSocketserv_1.setupWebSocketServer)(server);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb+srv://ashim:ashim12345@taskmanagerproject.zdfcogy.mongodb.net/simpleChatApp");
        app.listen(3000, () => {
            console.log("server is ready!!!!!!!!");
        });
    });
}
main();
