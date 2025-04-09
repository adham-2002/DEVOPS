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
const userService_1 = require("../services/userService");
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const router = express_1.default.Router();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        const result = yield (0, userService_1.register)({ firstName, lastName, email, password });
        res.status(result.statusCode).json(result.data);
    }
    catch (err) {
        res.status(500).json("Something Went Wrong!");
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield (0, userService_1.login)({ email, password });
        res.status(result.statusCode).json(result.data);
    }
    catch (err) {
        res.status(500).json("Something Went Wrong!");
    }
}));
router.get("/myorder", validateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const { statusCode, data } = yield (0, userService_1.getUserOrders)({
            userId: userId,
        });
        res.status(statusCode).send(data);
    }
    catch (err) {
        res.status(500).send("Something Went Wrong!");
    }
}));
exports.default = router;
