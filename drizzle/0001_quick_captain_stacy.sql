ALTER TABLE "products" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE INDEX "product_id_updatedAt_idx" ON "products" USING btree ("updatedAt","id");--> statement-breakpoint
CREATE INDEX "product_category_idx" ON "products" USING btree ("category","updatedAt","id");--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "updateAt";