import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/products", async (req, res) => {
  const products = await fs.readFile("./data/products.json", "utf8");
  res.json(JSON.parse(products));
});

app.get("/orders", async (req, res) => {
  const orders = await fs.readFile("./data/orders.json", "utf8");
  res.json(JSON.parse(orders));
});

app.post("/order", async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer["postal-code"] === null ||
    orderData.customer["postal-code"].trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile("./data/orders.json", "utf8");
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));
  res.status(201).json({ message: "Order created!" });
});

app.get("/wishlist", async (req, res) => {
  const wishlist = await fs.readFile("./data/wishlist.json", "utf8");
  res.json(JSON.parse(wishlist));
});

app.put("/wishlist", async (req, res) => {
  const wishlistItem = req.body;
  const wishlistItemId = wishlistItem.id;

  const wishlist = await fs.readFile("./data/wishlist.json", "utf8");
  const wishlistItems = JSON.parse(wishlist);

  const wishlistItemIndex = wishlistItems.findIndex(
    (item) => item.id === wishlistItemId
  );

  if (wishlistItemIndex >= 0) {
    wishlistItems.splice(wishlistItemIndex, 1);
  } else {
    wishlistItems.push(wishlistItem);
  }

  await fs.writeFile("./data/wishlist.json", JSON.stringify(wishlistItems));
  res.status(201).json({ message: "Wishlist updated!" });
});

app.get("/user-address", async (req, res) => {
  const address = await fs.readFile("./data/user-address.json", "utf8");
  res.json(JSON.parse(address));
});

app.post("/address", async (req, res) => {
  const address = req.body;
  await fs.writeFile("./data/user-address.json", JSON.stringify(address));
  res.status(201).json({ message: "Address added!" });
});

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(3000, () => console.log("listening..."));
