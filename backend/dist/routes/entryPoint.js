"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryPoint = void 0;
const express_1 = require("express");
const signupController_1 = require("../controllers/signupController");
const signinController_1 = require("../controllers/signinController");
exports.entryPoint = (0, express_1.Router)();
exports.entryPoint.post('/signup', signupController_1.signupController);
exports.entryPoint.post('/signin', signinController_1.signinController);
