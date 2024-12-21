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
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SCRETE = 'this is the super secrete key';
const app = (0, express_1.default)();
app.use(express_1.default.json());
// signup
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userSignupSchema = z.object({
    //     userName:z.string().min(3,{message:"minimum length shoudl be 3"}).max(15,{message:"maximum length shoudl be 15"}),
    //     email:z.string().email({message:"should be in a email format"}),
    //     password:z.string()
    // })
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
}));
// login
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        }, JWT_SCRETE);
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
}));
// middle ware
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({
                message: "token is missing"
            });
            return;
        }
        if (!jsonwebtoken_1.default.verify(String(token), JWT_SCRETE)) {
            res.status(403).json({
                message: "token is invalid"
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
app.get('/api/v1/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.userModel.find({}, 'userName _id');
        res.status(200).json({
            users: user
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "internal server error"
        });
    }
}));
app.use(auth);
// sending request 
app.post("/api/v1/user/sendRequest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
// accepting the request
app.post("/api/v1/user/request/acceptOrDelete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isAccept = req.body.isAccept;
    const senderId = req.body.senderId;
    const ownerId = req.body._id;
    if (isAccept) {
        try {
            let friend = yield db_1.friendsModel.findOne({
                userId: ownerId,
            });
            if (!friend) {
                yield db_1.friendsModel.create({
                    userId: ownerId,
                    friends: []
                });
            }
            if (!(friend === null || friend === void 0 ? void 0 : friend.friends.includes(senderId))) {
                friend === null || friend === void 0 ? void 0 : friend.friends.push(senderId);
                yield (friend === null || friend === void 0 ? void 0 : friend.save());
            }
            if (friend === null || friend === void 0 ? void 0 : friend.friends.includes(senderId)) {
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
}));
// joinnig the room
app.post('/api/v1/joinRoom', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.userRoomModel.create({
            roomId: req.body.roomId,
            userId: []
        });
    }
    catch (err) {
        res.status(500).json({
            message: "internal server error"
        });
    }
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb+srv://ashim:ashim12345@taskmanagerproject.zdfcogy.mongodb.net/simpleChatApp");
        app.listen(3000, () => {
            console.log("server is ready!!!!!!!!");
        });
    });
}
main();
