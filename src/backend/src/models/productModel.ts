import mongoose, { Schema, Document } from "mongoose";

export interface Iproduct extends Document {
  title: string;
  image: string;
  price: number;
  stock: number;
  Spec: object;
}

const productSchema = new Schema<Iproduct>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  Spec: {
    proccesor: { type: String },
    os: { type: String },
    ram: { type: String },
    storage: { type: String },
    graphics: { type: String },
  },
});

export const productModel = mongoose.model<Iproduct>("Products", productSchema);
