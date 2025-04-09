"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const productService_1 = require("./services/productService");
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const cartRoute_1 = __importDefault(require("./routes/cartRoute"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
const port = 3000;
app.use(express_1.default.json());
mongoose_1.default
    .connect(process.env.MONGO_URI || "")
    .then(() => {
    console.log("mongo connected");
})
    .catch((err) => {
    console.log("Faild to Connect", err);
});
(0, productService_1.seedInitialProducts)();
app.use("/api/user", userRoute_1.default);
app.use("/api/products", productRoute_1.default);
app.use("/api/cart", cartRoute_1.default);
// app.get("/health", (req, res) => {
//   res.status(200).send("ok");
// })
app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});
