import express from "express";
import librosRoutes from "./src/book/book.routes.js";
import authorsRoutes from "./src/author/author.routes.js";

const app = express();
const port = 3000;
//es para que lo transforme en json y lo interprete sin
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("ok");
});

app.use("/api", librosRoutes);
app.use("/api", authorsRoutes);

app.listen(port, () => {
  console.log(`Server funcionando en http://localhost:${port}`);
});
