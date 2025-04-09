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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOut = exports.clearItemInCart = exports.deleteItemInCart = exports.UpdateItemInCart = exports.addItemToCart = exports.getActiveCartForUser = void 0;
const cartModel_1 = require("../models/cartModel");
const orederModel_1 = require("../models/orederModel");
const productModel_1 = require("../models/productModel");
const createCartForUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId }) {
    const cart = yield cartModel_1.cartModel.create({ userId });
    yield cart.save();
    return cart;
});
const getActiveCartForUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, populateProduct, }) {
    let cart;
    if (populateProduct) {
        cart = yield cartModel_1.cartModel
            .findOne({ userId, status: "active" })
            .populate("items.product");
    }
    else {
        cart = yield cartModel_1.cartModel.findOne({ userId, status: "active" });
    }
    if (!cart) {
        cart = yield createCartForUser({ userId });
    }
    return cart;
});
exports.getActiveCartForUser = getActiveCartForUser;
const addItemToCart = (_a) => __awaiter(void 0, [_a], void 0, function* ({ productId, quantity, userId, }) {
    const cart = yield (0, exports.getActiveCartForUser)({ userId, populateProduct: true });
    const existsInCart = cart.items.find(({ product }) => product._id.toString() === productId);
    if (existsInCart) {
        return { data: "Item already exist in cart", statusCode: 400 };
    }
    const product = yield productModel_1.productModel.findById(productId);
    if (!product) {
        return { data: "product not found", statusCode: 400 };
    }
    if (product.stock < +quantity) {
        return { data: "Low stock for items", statusCode: 400 };
    }
    cart.items.push({
        product: productId,
        unitPrice: product.price,
        quantity: +quantity,
    });
    cart.totalAmount += product.price * +quantity;
    yield cart.save();
    return {
        data: yield (0, exports.getActiveCartForUser)({ userId, populateProduct: true }),
        statusCode: 200,
    };
});
exports.addItemToCart = addItemToCart;
const UpdateItemInCart = (_a) => __awaiter(void 0, [_a], void 0, function* ({ productId, quantity, userId, }) {
    const cart = yield (0, exports.getActiveCartForUser)({ userId, populateProduct: true });
    const existsInCart = cart.items.find(({ product }) => product._id.toString() === productId);
    if (!existsInCart) {
        return { data: "Item does not exist in cart", statusCode: 400 };
    }
    const product = yield productModel_1.productModel.findById(productId);
    if (!product) {
        return { data: "product not fond", statusCode: 400 };
    }
    if (product.stock < +quantity) {
        return { data: "Low stock for items", statusCode: 400 };
    }
    const otherCartItems = cart.items.filter((p) => {
        return p.product._id.toString() !== productId;
    });
    console.log(otherCartItems);
    let total = calculateCartTotalItems({ cartItems: otherCartItems });
    existsInCart.quantity = +quantity;
    total += existsInCart.quantity * existsInCart.unitPrice;
    cart.totalAmount = total;
    yield cart.save();
    return {
        data: yield (0, exports.getActiveCartForUser)({ userId, populateProduct: true }),
        statusCode: 200,
    };
});
exports.UpdateItemInCart = UpdateItemInCart;
const deleteItemInCart = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, productId, }) {
    const cart = yield (0, exports.getActiveCartForUser)({ userId, populateProduct: true });
    const existsInCart = cart.items.find(({ product }) => product._id.toString() === productId);
    if (!existsInCart) {
        return { data: "Item does not exist in cart", statusCode: 400 };
    }
    const otherCartItems = cart.items.filter((p) => {
        return p.product._id.toString() !== productId;
    });
    let total = calculateCartTotalItems({ cartItems: otherCartItems });
    cart.totalAmount = total;
    cart.items = otherCartItems;
    yield cart.save();
    return {
        data: yield (0, exports.getActiveCartForUser)({ userId, populateProduct: true }),
        statusCode: 200,
    };
});
exports.deleteItemInCart = deleteItemInCart;
const clearItemInCart = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId }) {
    const cart = yield (0, exports.getActiveCartForUser)({ userId, populateProduct: true });
    cart.items = [];
    cart.totalAmount = 0;
    const updatedCart = yield cart.save();
    return { data: updatedCart, statusCode: 200 };
});
exports.clearItemInCart = clearItemInCart;
const checkOut = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, address }) {
    if (!address) {
        return { data: "please add the address", statusCode: 400 };
    }
    const cart = yield (0, exports.getActiveCartForUser)({ userId, populateProduct: true });
    const orderItems = [];
    //loop cartItems and create orderItems
    for (const item of cart.items) {
        const product = yield productModel_1.productModel.findById(item.product);
        if (!product) {
            return { data: "Product Not Found", statusCode: 400 };
        }
        const orderItem = {
            productTitle: product === null || product === void 0 ? void 0 : product.title,
            productImage: product === null || product === void 0 ? void 0 : product.image,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
        };
        orderItems.push(orderItem);
    }
    const order = yield orederModel_1.orderModel.create({
        orderItems,
        total: cart.totalAmount,
        userId,
        address: address,
    });
    yield order.save();
    //Update the cart status to be completed
    cart.status = "completed";
    yield cart.save();
    return { data: order, statusCode: 200 };
});
exports.checkOut = checkOut;
const calculateCartTotalItems = ({ cartItems }) => {
    let total = cartItems.reduce((sum, product) => {
        sum += product.quantity * product.unitPrice;
        return sum;
    }, 0);
    return total;
};
