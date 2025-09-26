import { model, Model, Schema } from "mongoose";

export interface IListing {
  name: string;
  description: string;
  price: number;
  imageId: string;
  sellerId: string;
  categoryId: string;
  partId: string;
  condition: "New" | "Used" | "Refurbished";
  is_auction: boolean;
  status: "Active" | "Sold" | "Removed";
}

const ListingSchema = new Schema<IListing>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageId: { type: String, required: true, unique: true},
  sellerId: { type: String, required: true },
  categoryId: { type: String, required: true },
  condition: {
    type: String,
    enum: ["New", "Used", "Refurbished"],
    required: true,
  },
  is_auction: { type: Boolean, required: true },
  status: {
    type: String,
    enum: ["Active", "Sold", "Removed"],
    default: "Active",
    required: true,
  },
}, { timestamps: true });

export const Listing: Model<IListing> = model<IListing>("Listing", ListingSchema);
