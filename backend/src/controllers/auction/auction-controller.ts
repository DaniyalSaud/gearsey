import { Auction, type IAuction } from "@/models/auction.js";
import { type Request, type Response } from "express";

export async function getAuctions(req: Request, res: Response) {
  try {
    const { limit } = req.query;
    const auctions: IAuction[] = await Auction.find().limit(
      limit ? Number(limit) : 10
    );
    res
      .status(200)
      .json({ auctions, message: "Auctions fetched successfully." });
  } catch (error) {
    console.error("Error fetching auctions:", error);
    res.status(400).json({ message: "Failed to fetch auctions." });
  }
}

export async function getAuctionBySellerId(req: Request, res: Response) {
  try {
    const { sellerId } = req.body;
    const { limit } = req.query;
    if (!sellerId) {
      return res.status(403).json({ message: "Seller ID is required." });
    }

    const auctions: IAuction[] = await Auction.find({ sellerId }).limit(
      limit ? Number(limit) : 10
    );

    res
      .status(200)
      .json({ auctions, message: "Auctions fetched successfully." });
  } catch (error) {
    console.error("Error fetching auctions by seller id:", error);
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function updateAuction(req: Request, res: Response) {}

export async function deleteAuction(req: Request, res: Response) {}

export async function closeAuction(req: Request, res: Response) {
  try {
    const { auctionId } = req.body;

    const updatedAuction = await Auction.findByIdAndUpdate(
      auctionId,
      {
        status: "Closed",
      },
      { new: true }
    );

    if (!updatedAuction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res
      .status(200)
      .json({ updatedAuction, message: "Auction closed successfully" });
  } catch (error) {
    console.error("Error closing auction:", error);
    res.status(400).json({
      message: "Failed to close the auction. Auction is still going on.",
    });
  }
}

export async function cancelAuction(req: Request, res: Response) {
  try {
    const { auctionId } = req.body;
    const updatedAuction = await Auction.findByIdAndUpdate(
      auctionId,
      {
        status: "Cancelled",
      },
      { new: true }
    );
    if (!updatedAuction) {
      return res.status(404).json({ message: "Auction not found" });
    }
    res
      .status(200)
      .json({ updatedAuction, message: "Auction cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling auction:", error);
    res.status(400).json({ message: "Failed to cancel the auction." });
  }
}
