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
exports.getUserOrders = exports.login = exports.register = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orederModel_1 = require("../models/orederModel");
const register = (_a) => __awaiter(void 0, [_a], void 0, function* ({ firstName, lastName, email, password, }) {
    const findUser = yield userModel_1.userModel.findOne({ email });
    if (findUser) {
        return { data: "User already exist", statusCode: 400 };
    }
    const hashedpassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = new userModel_1.userModel({
        lastName,
        email,
        firstName,
        password: hashedpassword,
    });
    yield newUser.save();
    return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
});
exports.register = register;
const login = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const findUser = yield userModel_1.userModel.findOne({ email });
    if (!findUser) {
        return { data: "Incorrect Email or Password", statusCode: 400 };
    }
    const PasswordMatch = yield bcrypt_1.default.compare(password, findUser.password);
    if (PasswordMatch) {
        return {
            data: generateJWT({
                firstName: findUser.firstName,
                lastName: findUser.lastName,
                email,
            }),
            statusCode: 200,
        };
    }
    return { data: "Incorrect Email or Password", statusCode: 400 };
});
exports.login = login;
const getUserOrders = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId }) {
    try {
        return { data: yield orederModel_1.orderModel.find({ userId }), statusCode: 200 };
    }
    catch (error) {
        throw error;
    }
});
exports.getUserOrders = getUserOrders;
const generateJWT = (data) => {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET || "");
};
