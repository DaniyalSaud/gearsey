import { Category } from "@/models/category.js";
import { Listing, type IListing } from "@/models/listing.js";
import { type Request, type Response } from "express";

// Returns all products, with optional category filter and limit
export async function getProducts(req: Request, res: Response) {
  try {
    const { limit, category } = req.query;

    let products: IListing[];
    if (!category) {
      products = await Listing.find().limit(Number(limit) || 10);
    } else {
      products = await Listing.find({ category }).limit(Number(limit) || 10);
    }

    let finalProducts = [];
    for (const product of products) {
      const categoryData = await Category.findById(product.categoryId);
      let fProduct: any = product;
      fProduct.category = categoryData!.name;
      finalProducts.push(fProduct);
    }

    res.status(200).json({
      message: "Products fetched successfully",
      finalProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error as Error);
    res.status(400).json({
      message: "Failed to fetch products",
      error: (error as Error).message,
    });
  }
}

// Returns the products of a specific seller by their sellerId
export async function getProductsBySellerId(req: Request, res: Response) {
  try {
    const { sellerId } = req.body;
    const { limit, category } = req.query;

    if (!sellerId) {
      return res
        .status(403)
        .json({ message: "Missing sellerId in request body" });
    }

    let productsOfSeller: IListing[];
    let finalProducts = [];

    if (category) {
      const categoryData = await Category.find({ name: category }).limit(1);
      productsOfSeller = await Listing.find({ sellerId }).limit(
        Number(limit) || 10
      );
      for (const product of productsOfSeller) {
        let fProduct: any = product;
        fProduct.category = categoryData[0]!.name;
        finalProducts.push(fProduct);
      }
    }

    productsOfSeller = await Listing.find({ sellerId }).limit(
      Number(limit) || 10
    );

    for (const product of productsOfSeller) {
      const categoryData = await Category.findById(product.categoryId);
      let fProduct: any = product;
      fProduct.category = categoryData!.name;
      finalProducts.push(fProduct);
    }

    res.status(200).json({
      message: "Products by seller id fetched successfully",
      productsOfSeller,
    });
  } catch (error) {
    console.error("Error fetching products by seller id:", error as Error);
    res.status(400).json({
      message: "Failed to fetch products by seller id",
      error: (error as Error).message,
    });
  }
}

// Creates a new product and returns the created product
export async function createProduct(req: Request, res: Response) {
  try {
    const { title, description, price, category, imageUrl, sellerId } =
      req.body;

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !imageUrl ||
      !sellerId
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: title, description, price, category, imageUrl, sellerId",
      });
    }

    // Fetch the ID of the category from the Categories collection
    const categoryId = await Category.find({ name: category }).limit(1);
    if (categoryId.length === 0) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const product = await Listing.insertOne({
      title,
      description,
      price,
      categoryId,
      imageUrl,
      sellerId,
    });

    res.status(201).json({ message: "Product created successfully", product });
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
    const { productId, title, description, price, category, imageUrl } =
      req.body;

    if (!productId) {
      return res
        .status(404)
        .json({ message: "Missing productId in request body" });
    }

    const updatedProduct = await Listing.findByIdAndUpdate(
      productId,
      { title, description, price, category, imageUrl },
      { new: true }
    );

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

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error as Error);
    res.status(400).json({
      message: "Failed to delete product",
      error: (error as Error).message,
    });
  }
}
