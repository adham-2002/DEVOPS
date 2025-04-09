import { FC, PropsWithChildren, useEffect, useState } from "react";

import { CartContext } from "./CartContext";
import { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AutContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItem] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { token } = useAuth();
  const [error, setError] = useState("");
  useEffect(() => {
    const fechCart = async () => {
      if (!token) {
        return;
      }
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        setError("Failed to fetch user cart, please try again");
      }
      const cart = await response.json();
      if (!cart) {
        setError("failed to parce cart data");
      }
      const cartItemsMaped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: any;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          unitPrice,
          quantity,
        })
      );
      setCartItem([...cartItemsMaped]);
      setTotalAmount(cart.totalAmount);
    };
    fechCart();
  }, [token]);

  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });
      if (!response.ok) {
        setError("Failed to add to cart");
      }

      const cart = await response.json();
      if (!cart) {
        setError("failed to parce cart data");
      }
      const cartItemsMaped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: any;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          unitPrice,
          quantity,
        })
      );
      setCartItem([...cartItemsMaped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };
  const updateItemInCart = async (productId: string, quantity: number) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });
      if (!response.ok) {
        setError("Failed to Update to cart");
      }

      const cart = await response.json();
      if (!cart) {
        setError("failed to parce cart data");
      }
      const cartItemsMaped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: any;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          unitPrice,
          quantity,
        })
      );
      setCartItem([...cartItemsMaped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };
  const removeItemFromCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError("Failed to Remove to cart");
      }

      const cart = await response.json();
      if (!cart) {
        setError("failed to Remove cart data");
      }
      const cartItemsMaped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: any;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          unitPrice,
          quantity,
        })
      );
      setCartItem([...cartItemsMaped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };
  const clearItems = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError("Failed to clear cart");
      }

      const cart = await response.json();
      if (!cart) {
        setError("failed to clear cart data");
      }
      setCartItem([]);
      setTotalAmount(0);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
        updateItemInCart,
        removeItemFromCart,
        clearItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
