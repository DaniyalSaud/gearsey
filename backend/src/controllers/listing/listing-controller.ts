import { Category } from "@/models/category.js";
import { Listing, type IListing } from "@/models/listing.js";
import { Image } from "@/models/images.js";
import { type Request, type Response } from "express";
import { ObjectId } from "mongodb";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

// Returns all products, with optional category, sellerId filter and limit
export async function getProducts(req: Request, res: Response) {
  try {
    const { limit, category, sellerId, query } = req.query;
    const filter: Record<string, unknown> = {};

    if (sellerId) {
      filter.sellerId = sellerId;
    }

    if (query) {
      filter.$text = { $search: query as string };
    }

    if (category) {
      const categoryDoc = await Category.findOne({ name: category }).select(
        "_id"
      );
      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }
      filter.categoryId = categoryDoc._id;
    }

    const products = await Listing.find(filter)
      .limit(Number(limit) || 25)
      .populate("categoryId", ["name", "description"])
      .populate("imageIds", ["fileName", "mime", "size"])
      .exec();

    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error as Error);
    res.status(400).json({
      message: "Failed to fetch products",
      error: (error as Error).message,
    });
  }
}

// Creates a new product and returns the created product
export async function createProduct(req: Request, res: Response) {
  try {
    const { title, description, price, category, sellerId, condition, is_auction } =
      req.body;
    const images = req.files as Express.Multer.File[];

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !sellerId ||
      !images ||
      !Array.isArray(images) ||
      images.length === 0
    ) {
      throw new Error(
        "Missing required fields: title, description, price, category, sellerId, and at least one image"
      );
    }

    // Fetch the ID of the category from the Categories collection
    const categoryId = await Category.find({ name: category }).limit(1);
    if (categoryId.length === 0) {
      throw new Error("Invalid category");
    }

    // Ensure the public/products directory exists
    const productsDir = path.join(process.cwd(), "public", "products");
    await mkdir(productsDir, { recursive: true });

    // Store images in the public/products folder and save their entries in the database
    const imageIds: ObjectId[] = [];
    
    for (const image of images) {
      // Validate image type
      if (!image.mimetype.startsWith("image/")) {
        throw new Error(`Invalid file type: ${image.mimetype}`);
      }

      // Determine mime type
      let mime: "image/jpg" | "image/png";
      if (image.mimetype === "image/png") {
        mime = "image/png";
      } else if (image.mimetype === "image/jpeg" || image.mimetype === "image/jpg") {
        mime = "image/jpg";
      } else {
        throw new Error(`Unsupported image format: ${image.mimetype}. Only JPG and PNG are supported.`);
      }

      // Generate a unique filename
      const fileExtension = mime === "image/png" ? "png" : "jpg";
      const uniqueFileName = `${Date.now()}-${randomBytes(8).toString("hex")}.${fileExtension}`;
      const filePath = path.join(productsDir, uniqueFileName);

      // Save the image file to disk
      await writeFile(filePath, image.buffer);

      // Create an Image document (without listingId for now)
      const imageDoc = await Image.create({
        fileName: uniqueFileName,
        mime,
        size: image.size,
        listingId: new ObjectId(), // Temporary placeholder, will be updated
      });

      imageIds.push(imageDoc._id as ObjectId);
    }

    // Create the product listing
    const product = await Listing.create({
      name: title,
      description,
      price,
      categoryId: categoryId[0]!._id,
      imageIds,
      sellerId,
      condition: condition || "Used",
      is_auction: is_auction === true || is_auction === "true",
    });

    // Update all image documents with the correct listingId
    await Image.updateMany(
      { _id: { $in: imageIds } },
      { $set: { listingId: product._id } }
    );

    // Populate the product data before returning
    const populatedProduct = await Listing.findById(product._id)
      .populate("categoryId", ["name", "description"])
      .populate("imageIds", ["fileName", "mime", "size"])
      .exec();

    res.status(201).json({ 
      message: "Product created successfully", 
      product: populatedProduct 
    });
  } catch (error) {
    console.error("Error creating product:", error as Error);
    res.status(400).json({
      message: "Failed to create product",
      error: (error as Error).message,
    });
  }
}

// Updates a product by its ID and returns the newly updated product. Only the fields provided in the request body will be updated.
export async function updateProduct(req: Request, res: Response) {
  try {
    const { productId, title, description, price, category, condition, is_auction } =
      req.body;
    const images = req.files as Express.Multer.File[] | undefined;

    if (!productId) {
      return res
        .status(404)
        .json({ message: "Missing productId in request body" });
    }

    const updateData: Record<string, unknown> = {};
    if (title) updateData.name = title;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (condition) updateData.condition = condition;
    if (is_auction !== undefined) updateData.is_auction = is_auction === true || is_auction === "true";
    
    // Handle new images if provided
    if (images && Array.isArray(images) && images.length > 0) {
      const productsDir = path.join(process.cwd(), "public", "products");
      await mkdir(productsDir, { recursive: true });

      const newImageIds: ObjectId[] = [];

      for (const image of images) {
        // Validate image type
        if (!image.mimetype.startsWith("image/")) {
          throw new Error(`Invalid file type: ${image.mimetype}`);
        }

        // Determine mime type
        let mime: "image/jpg" | "image/png";
        if (image.mimetype === "image/png") {
          mime = "image/png";
        } else if (image.mimetype === "image/jpeg" || image.mimetype === "image/jpg") {
          mime = "image/jpg";
        } else {
          throw new Error(`Unsupported image format: ${image.mimetype}. Only JPG and PNG are supported.`);
        }

        // Generate a unique filename
        const fileExtension = mime === "image/png" ? "png" : "jpg";
        const uniqueFileName = `${Date.now()}-${randomBytes(8).toString("hex")}.${fileExtension}`;
        const filePath = path.join(productsDir, uniqueFileName);

        // Save the image file to disk
        await writeFile(filePath, image.buffer);

        // Create an Image document
        const imageDoc = await Image.create({
          fileName: uniqueFileName,
          mime,
          size: image.size,
          listingId: new ObjectId(productId),
        });

        newImageIds.push(imageDoc._id as ObjectId);
      }

      // Add new images to existing ones
      updateData.$push = { imageIds: { $each: newImageIds } };
    }
    
    if (category) {
      const categoryDoc = await Category.findOne({ name: category }).select(
        "_id"
      );
      if (!categoryDoc) {
        return res.status(403).json({ message: "Invalid category" });
      }
      updateData.categoryId = categoryDoc._id;
    }

    const updatedProduct = await Listing.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    )
      .populate("categoryId", ["name", "description"])
      .populate("imageIds", ["fileName", "mime", "size"])
      .exec();

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error as Error);
    res.status(400).json({
      message: "Failed to update product",
      error: (error as Error).message,
    });
  }
}

// Removes a product by its ID. It is permanently deleted from the database.
export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res
        .status(404)
        .json({ message: "Missing productId in request body" });
    }

    const deletedProduct = await Listing.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Optionally delete associated images from database and disk
    if (deletedProduct.imageIds && deletedProduct.imageIds.length > 0) {
      await Image.deleteMany({ _id: { $in: deletedProduct.imageIds } });
      // Note: You may also want to delete the actual image files from disk
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error as Error);
    res.status(400).json({
      message: "Failed to delete product",
      error: (error as Error).message,
    });
  }
}

// Get a specific image by filename
export async function getImage(req: Request, res: Response) {
  try {
    const { filename } = req.params;

    if (!filename) {
      return res.status(400).json({ message: "Missing filename parameter" });
    }

    const imagePath = path.join(process.cwd(), "public", "products", filename);
    
    // Send the file
    res.sendFile(imagePath, (err) => {
      if (err) {
        console.error("Error sending image:", err);
        res.status(404).json({ message: "Image not found" });
      }
    });
  } catch (error) {
    console.error("Error fetching image:", error as Error);
    res.status(400).json({
      message: "Failed to fetch image",
      error: (error as Error).message,
    });
  }
}
