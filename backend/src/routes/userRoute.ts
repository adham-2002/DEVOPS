import express from "express";
import { getUserOrders, login, register,logout,refreshToken } from "../services/userService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";
const router = express.Router();
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await register({ firstName, lastName, email, password });
    res.status(result.statusCode).json(result.data);
  } catch (err) {
    res.status(500).json("Something Went Wrong!");
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login({ email, password });
    res.status(result.statusCode).json(result.data);
  } catch (err) {
    res.status(500).json("Something Went Wrong!");
  }
});
router.get("/myorder", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { statusCode, data } = await getUserOrders({
      userId: userId,
    });
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("Something Went Wrong!");
  }
});
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  const result = await refreshToken(refreshToken);
  res.status(result.statusCode).json(result.data);
});

router.post('/logout', validateJWT, async (req: ExtendRequest, res) => {
  const result = await logout(req.user!._id.toString());
  res.status(result.statusCode).json(result.data);
});
export default router;
