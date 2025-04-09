import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCart } from "../Context/cart/CartContext";
interface props {
  _id: string;
  title: string;
  image: string;
  price: string;
  Spec?: {
    proccesor?: string;
    os?: string;
    ram?: string;
    storage?: string;
    graphics?: string;
  };
}
export default function ProductCard({ _id, title, Spec, image, price }: props) {
  const { addItemToCart } = useCart();
  return (
    <Card>
      <CardMedia>
        <img
          src={image}
          alt="green iguana"
          style={{
            height: "200px",
            width: "100%",
            objectFit: "contain",
          }}
        />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {Spec?.proccesor}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {Spec?.os}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {Spec?.ram}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {Spec?.storage}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {Spec?.graphics}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {price} EGP
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => addItemToCart(_id)}
        >
          Add to card
        </Button>
      </CardActions>
    </Card>
  );
}
