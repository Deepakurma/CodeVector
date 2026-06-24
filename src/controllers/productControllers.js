import { and, desc, eq, lt, or } from "drizzle-orm";
import { db } from "../db/index.js";
import { products } from "../db/schema.js";

export async function addProducts(req, res) {
  try {
    const { name, category, price } = req.body;

    await db
      .insert(products)
      .values({
        name,
        category,
        price,
      })
      .returning();

    res.status(201).json({
      message: "products added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to add product",
    });
  }
}

export async function getProducts(req, res) {
  try {
    const requestedLimit = Number(req.query.limit);

    const limit = requestedLimit > 0 ? Math.min(requestedLimit, 100) : 20;

    const cursorId = Number(req.query.cursorId);
    const cursorUpdatedAt = req.query.cursorUpdatedAt
      ? new Date(req.query.cursorUpdatedAt)
      : null;

    const category = req.query.category;

    const filters = [];

    if (category) {
      filters.push(eq(products.category, category));
    }

    if (cursorId && cursorUpdatedAt) {
      filters.push(
        or(
          lt(products.updatedAt, cursorUpdatedAt),

          and(
            eq(products.updatedAt, cursorUpdatedAt),
            lt(products.id, cursorId),
          ),
        ),
      );
    }

    const results = await db
      .select()
      .from(products)
      .where(filters.length ? and(...filters) : undefined)
      .limit(limit)
      .orderBy(desc(products.updatedAt), desc(products.id));

    const lastItem = results[results.length - 1];

    const nextCursor = lastItem
      ? {
          cursorId: lastItem.id,
          cursorUpdatedAt: lastItem.updatedAt,
        }
      : null;

    res.status(200).json({
      data: results,
      nextCursor,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to load products",
    });
  }
}
