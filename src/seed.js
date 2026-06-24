import "dotenv/config";
import { db } from "./db/index.js";
import { products } from "./db/schema.js";

const categories = ["sport", "electronics", "fashion", "books", "food"];

const TOTAL = 200000;
const BATCH = 5000;

async function seed() {
  for (let start = 0; start < TOTAL; start += BATCH) {
    const data = [];

    for (let i = start; i < start + BATCH && i < TOTAL; i++) {
      data.push({
        name: `Product ${i + 1}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        price: Math.floor(Math.random() * 10000),
      });
    }

    await db.insert(products).values(data);
  }

  console.log("Seed complete");
}

seed();
