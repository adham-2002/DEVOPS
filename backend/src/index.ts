import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import { productModel } from "./models/productModel";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors({
  origin: "https://kubeshop.local",
  credentials: true
}));
const port = 3000;
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log("Faild to Connect", err);
  });

seedInitialProducts();
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
// app.get("/health", (req, res) => {
//   res.status(200).send("ok");
// })
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});

