import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import { useCart } from "../Context/cart/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemFromCart,
    clearItems,
  } = useCart();
  const hadleCheckout = async () => {
    navigate("/checkout");
  };
  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };
  const handleremoveItemFromCart = (prductId: string) => {
    removeItemFromCart(prductId);
  };

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">My Cart</Typography>
        <Button onClick={() => clearItems()}>Clear Cart</Button>
      </Box>

      {cartItems.length ? (
        <Box display="flex" flexDirection="column" gap={4}>
          {cartItems.map((item) => (
            <Box
              key={item.productId}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: 1,
                borderColor: "#f2f2f2",
                borderRadius: 5,
                padding: 1,
              }}
            >
              <Box
                display="flex"
                flexDirection="row"
                // justifyContent="space-between"
                alignItems="center"
                gap={1}
              >
                <img src={item.image} width={50} />
                <Box>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography>
                    {item.quantity}X{item.unitPrice} EGP
                  </Typography>
                  <Button
                    onClick={() => {
                      handleremoveItemFromCart(item.productId);
                    }}
                  >
                    REMOVE ITEM
                  </Button>
                </Box>
              </Box>
              <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button
                  onClick={() =>
                    handleQuantity(item.productId, item.quantity - 1)
                  }
                >
                  -
                </Button>
                <Button
                  onClick={() =>
                    handleQuantity(item.productId, item.quantity + 1)
                  }
                >
                  +
                </Button>
              </ButtonGroup>
            </Box>
          ))}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography variant="h5">
              Total Amount:{totalAmount.toFixed(2)} EGP
            </Typography>
            <Button variant="contained" onClick={hadleCheckout}>
              Go to checkout
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography>
          Cart is empty, Please shoping and add items first
        </Typography>
      )}
    </Container>
  );
};
export default CartPage;
