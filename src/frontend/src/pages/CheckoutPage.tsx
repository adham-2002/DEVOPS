import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../Context/cart/CartContext";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../Context/Auth/AutContext";
import { BASE_URL } from "../constants/baseUrl";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);
  const { token } = useAuth();
  const [error, seterror] = useState("");

  const onSubmit = async () => {
    const address = addressRef?.current?.value;

    if (!address) {
      seterror("address field is required");
      return;
    }
    const response = await fetch(`${BASE_URL}/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      seterror("Unable to Checkout,please try again!");
      return;
    }

    seterror("");
    navigate("/order-success");
  };

  return (
    <Container
      fixed
      sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Checkout</Typography>
      </Box>
      <TextField
        inputRef={addressRef}
        label="Delivery Address"
        name="address"
        fullWidth
      />
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          border: 1,
          borderColor: "#f2f2f2",
          borderRadius: 5,
          padding: 1,
        }}
      >
        {cartItems.map((item) => (
          <Box
            key={item.productId}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={1}
              width="100%"
            >
              <img src={item.image} width={50} />
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography variant="h6">{item.title}</Typography>
                <Typography>
                  {item.quantity}X{item.unitPrice} EGP
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <Typography variant="body2" sx={{ textAlign: "right" }}>
          Total Amount:{totalAmount.toFixed(2)} EGP
        </Typography>
      </Box>
      <Button variant="contained" fullWidth onClick={() => onSubmit()}>
        Pay Now
      </Button>
    </Container>
  );
};
export default CheckoutPage;
