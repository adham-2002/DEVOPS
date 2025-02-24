// import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth/AutContext";
import { useEffect } from "react";

const MyOrderPage = () => {
  const { getMyOrders, myOrders } = useAuth();

  useEffect(() => {
    getMyOrders();
  }, []);
  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography variant="h6">My Orders</Typography>
      {myOrders.map(({ address, orderItems, total }) => (
        <Box
          sx={{
            border: 1,
            borderColor: "gray",
            borderRadius: 2,
            padding: 1,
            width: "70%",
          }}
        >
          <Typography>Address:{address}</Typography>
          <Typography>Items:{orderItems.length}</Typography>
          {orderItems.map(
            ({
              productTitle,
              quantity,
            }: {
              productTitle: string;
              quantity: number;
            }) => (
              <Typography>
                {productTitle} x {quantity}
              </Typography>
            )
          )}
          <Typography>Total:{total}</Typography>
        </Box>
      ))}
    </Container>
  );
};
export default MyOrderPage;
