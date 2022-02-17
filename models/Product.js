import mongoose from "mongoose";

const RateReview = new mongoose.Schema(
  {
    rate: {
      type: String,
      default: 0,
    },
    starImg: {
      type: String,
    },
    review: {
      type: String,
    },
    customer: {
      type: String,
    },
  },
  { timestamps: true }
);
const imagePath = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    img: [imagePath],
    imgLarge: [imagePath],
    price: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    offer: {
      type: String,
    },
    returnPolicy: {
      type: String,
    },
    RateReview: [RateReview],
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
