import { cartModel, ICartItem } from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orederModel";
import { productModel } from "../models/productModel";

interface createCartForUser {
  userId: string;
}
const createCartForUser = async ({ userId }: createCartForUser) => {
  const cart = await cartModel.create({ userId });
  await cart.save();
  return cart;
};
interface getActiveCartForUser {
  userId: string;
  populateProduct: boolean;
}
export const getActiveCartForUser = async ({
  userId,
  populateProduct,
}: getActiveCartForUser) => {
  let cart;
  if (populateProduct) {
    cart = await cartModel
      .findOne({ userId, status: "active" })
      .populate("items.product");
  } else {
    cart = await cartModel.findOne({ userId, status: "active" });
  }
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};
interface addItemToCart {
  productId: any;
  quantity: String;
  userId: any;
}
export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: addItemToCart) => {
  const cart = await getActiveCartForUser({ userId, populateProduct: true });
  const existsInCart = cart.items.find(
    ({ product }) => (product as { _id: string })._id.toString() === productId
  );
  if (existsInCart) {
    return { data: "Item already exist in cart", statusCode: 400 };
  }
  const product = await productModel.findById(productId);
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
  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};
interface UpdateItemInCart {
  productId: string;
  quantity: number;
  userId: any;
}

export const UpdateItemInCart = async ({
  productId,
  quantity,
  userId,
}: UpdateItemInCart) => {
  const cart = await getActiveCartForUser({ userId, populateProduct: true });
  const existsInCart = cart.items.find(
    ({ product }) => (product as { _id: string })._id.toString() === productId
  );
  if (!existsInCart) {
    return { data: "Item does not exist in cart", statusCode: 400 };
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "product not fond", statusCode: 400 };
  }
  if (product.stock < +quantity) {
    return { data: "Low stock for items", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter((p) => {
    return (p.product as { _id: string })._id.toString() !== productId;
  });
  console.log(otherCartItems);
  let total = calculateCartTotalItems({ cartItems: otherCartItems });
  existsInCart.quantity = +quantity;
  total += existsInCart.quantity * existsInCart.unitPrice;
  cart.totalAmount = total;
  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};
interface deleteItemInCart {
  productId: string;
  userId: any;
}
export const deleteItemInCart = async ({
  userId,
  productId,
}: deleteItemInCart) => {
  const cart = await getActiveCartForUser({ userId, populateProduct: true });
  const existsInCart = cart.items.find(
    ({ product }) => (product as { _id: string })._id.toString() === productId
  );
  if (!existsInCart) {
    return { data: "Item does not exist in cart", statusCode: 400 };
  }
  const otherCartItems = cart.items.filter((p) => {
    return (p.product as { _id: string })._id.toString() !== productId;
  });
  let total = calculateCartTotalItems({ cartItems: otherCartItems });
  cart.totalAmount = total;
  cart.items = otherCartItems;
  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};
interface clearItemInCart {
  userId: string;
}
export const clearItemInCart = async ({ userId }: clearItemInCart) => {
  const cart = await getActiveCartForUser({ userId, populateProduct: true });
  cart.items = [];
  cart.totalAmount = 0;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};
interface checkOut {
  userId: string;
  address: string;
}
export const checkOut = async ({ userId, address }: checkOut) => {
  if (!address) {
    return { data: "please add the address", statusCode: 400 };
  }
  const cart = await getActiveCartForUser({ userId, populateProduct: true });
  const orderItems: IOrderItem[] = [];
  //loop cartItems and create orderItems
  for (const item of cart.items) {
    const product = await productModel.findById(item.product);
    if (!product) {
      return { data: "Product Not Found", statusCode: 400 };
    }
    const orderItem: IOrderItem = {
      productTitle: product?.title,
      productImage: product?.image,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    };
    orderItems.push(orderItem);
  }
  const order = await orderModel.create({
    orderItems,
    total: cart.totalAmount,
    userId,
    address: address,
  });
  await order.save();

  //Update the cart status to be completed
  cart.status = "completed";
  await cart.save();
  return { data: order, statusCode: 200 };
};
const calculateCartTotalItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  let total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  return total;
};
