"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEndPoints = void 0;
const express_1 = require("express");
const sendRequestController_1 = require("../controllers/sendRequestController");
const acceptOrDeleteController_1 = require("../controllers/acceptOrDeleteController");
exports.userEndPoints = (0, express_1.Router)();
exports.userEndPoints.post('/sendRequest', sendRequestController_1.sendRequestController);
exports.userEndPoints.post('/request/acceptOrDelete', acceptOrDeleteController_1.acceptOrDeleteController);
