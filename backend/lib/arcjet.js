import arcjet, { tokenBucket, detectBot, shield } from "@arcjet/node";
import http from "node:http";

import "dotenv/config";

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"], // track requests by a custom user ID
  rules: [
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    shield({
      mode: "DRY_RUN",
    }),

    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      refillRate: 30, // refill 30 tokens per interval
      interval: 5, // refill every 5 seconds
      capacity: 20, // bucket maximum capacity of 20 tokens
    }),
  ],
});
