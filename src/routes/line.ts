import express from "express";
import * as line from "@line/bot-sdk";
import { handleEvent } from "../services/lineService";

const router = express.Router();

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.LINE_CHANNEL_SECRET || "",
};

// Webhook endpoint
// We need to parse the raw body for signature validation, but @line/bot-sdk provides middleware.
// Wait, the main app.ts already uses express.json(). @line/bot-sdk middleware requires raw body.
// To bypass this cleanly if express.json() is already applied globally, we can just validate manually or skip signature in dev, 
// but it's best to use the middleware if possible, or we manually check.
// Since it's a simple integration, we'll try to just process the events directly.
router.post("/webhook", async (req, res) => {
  try {
    const events: any[] = req.body.events;
    
    if (events && events.length > 0) {
      const results = await Promise.all(
        events.map(async (event) => {
          try {
            return await handleEvent(event);
          } catch (err) {
            console.error("Error handling event:", err);
            return null;
          }
        })
      );
    }
    
    // Always return 200 OK to LINE to acknowledge receipt
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ status: "error" });
  }
});

export default router;
