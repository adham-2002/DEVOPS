import express from "express";
import validateJWT from "../middlewares/validateJWT";
import {
  addItemToCart,
  checkOut,
  clearItemInCart,
  deleteItemInCart,
  getActiveCartForUser,
  UpdateItemInCart,
} from "../services/cartService";
import { ExtendRequest } from "../types/extendedRequest";
const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({
      userId: userId,
      populateProduct: true,
    });
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send("Something Went Wrong!");
  }
});
router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something Went Wrong!");
  }
});
router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await UpdateItemInCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something Went Wrong!");
  }
});
router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId } = req.params;
      const response = await deleteItemInCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch (err) {
      res.status(500).send("Something Went Wrong!");
    }
  }
);
router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const response = await clearItemInCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something Went Wrong!");
  }
});

router.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;
    const response = await checkOut({ userId, address });
    res.status(response.statusCode).send(response.data);
  } catch (err) {
    res.status(500).send("Something Went Wrong!");
  }
});

export default router;
