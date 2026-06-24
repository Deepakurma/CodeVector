import express from "express";
import "dotenv/config";
import productRoutes from "./routes/products.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "hello there!",
  });
});

app.use("/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "route not found!",
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listenting on port ${port}`);
});
