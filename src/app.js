const express = require("express");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`App running on port ${port}.\nhttp://localhost:${port}`);
});
