import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import ProductCard from "../components/ProductCart";
import { useEffect, useState } from "react";
import { Product } from "../types/Products";
import { BASE_URL } from "../constants/baseUrl";

const HomePage = () => {
  const [products, setproducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        setproducts(data);
        console.log(data);
      } catch {
        setError(true);
      }
    };

    fechData();
  }, []);
  if (error) {
    return <Box>something went wrong, please try again</Box>;
  }
  const filteredCartItems = products.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Container sx={{ mt: 2 }}>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <TextField
          fullWidth
          label="Search Items"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredCartItems.length ? (
          <Grid container spacing={2}>
            {filteredCartItems.map((p) => (
              <Grid key={p._id} item md={4}>
                <ProductCard {...p} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>
            {searchTerm
              ? "No items match your search."
              : "Cart is empty, Please shop and add items first."}
          </Typography>
        )}
      </Box>
    </Container>
  );
};
export default HomePage;
