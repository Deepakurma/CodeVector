import {
  integer,
  pgTable,
  text,
  timestamp,
  serial,
  index,
} from "drizzle-orm/pg-core";

export const products = pgTable(
  "products",
  {
    id: serial().primaryKey(),
    name: text().notNull(),
    category: text().notNull(),
    price: integer().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (table) => [
    index("product_id_updatedAt_idx").on(table.updatedAt, table.id),

    index("product_category_idx").on(table.category, table.updatedAt, table.id),
  ],
);
