import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import redisClient from "../redisClient";
import { orderModel } from "../models/orederModel";
interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email }) 

  if (findUser) {
    return { data: "User already exists", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  }) as any | null;

  try {
    await newUser.save();
  } catch (error) {
    return { data: "Error creating user", statusCode: 500 };
  }

  // Generate tokens using the new user's ID
  const accessToken = generateAccessToken(newUser._id.toString());
  const refreshToken = generateRefreshToken(newUser._id.toString());

  // Store the refresh token in Redis
  await redisClient.set(
    refreshToken,
    newUser._id.toString(),
    "EX",
    7 * 24 * 60 * 60 // 7 days
  );

  return {
    data: {
      accessToken,
      refreshToken,
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    },
    statusCode: 200,
  };
};
interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email }) as any | null;

  if (!findUser) {
    return { data: "Incorrect Email or Password", statusCode: 400 };
  }

  const PasswordMatch = await bcrypt.compare(password, findUser.password);
  if (PasswordMatch) {
    const accessToken = generateAccessToken(findUser._id.toString());
    const refreshToken = generateRefreshToken(findUser._id.toString());
    await redisClient.set(refreshToken, findUser._id.toString(), "EX", 7 * 24 * 60 * 60);
    return {
      data: {
        accessToken,
        refreshToken,
        user:{
          firstName: findUser.firstName,
          lastName: findUser.lastName,
          email: findUser.email
        }
      },
      statusCode: 200,
    };
  }
  return { data: "Incorrect Email or Password", statusCode: 400 };
};
export const refreshToken = async (refreshToken: string) => {
  try{
    const decoded= jwt.verify(refreshToken, process.env.JWT_SECRET!) as { userId: string };
    const storedToken = await redisClient.get(decoded.userId);
    if (storedToken !== refreshToken) {
      return { data: "Invalid Refresh Token", statusCode: 400 };
    }
    const newAccessToken = generateAccessToken(decoded.userId);
    return { data: { accessToken: newAccessToken }, statusCode: 200 };
  }catch(error){
    return { data: "Invalid Refresh Token", statusCode: 401 };
  }
}
export const logout = async(userId:string)=>{
  await redisClient.del(userId);
  return { data: "Logout Success", statusCode: 200 };
}
interface ordersItems {
  userId: string;
}
export const getUserOrders = async ({ userId }: ordersItems) => {
  try {
    return { data: await orderModel.find({ userId }), statusCode: 200 };
  } catch (error) {
    throw error;
  }
};
// ! genrate jwt token
const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '15m' });
};
//! genrate refresh token
const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
};
