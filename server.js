import express from "express";
import "dotenv/config";
import librosRoutes from "./src/book/book.routes.js";
import authorsRoutes from "./src/author/author.routes.js";
import usersRoutes from "./src/users/users.routes.js";
import authRoutes from "./src/auth/auth.routes.js";

const app = express();
const port = parseInt(process.env.APIBOOK_PORT) || 3000;
console.log(process.env.APIBOOK_PORT);
//es para que lo transforme en json y lo interprete sin
app.use(express.json());

//middleware METODO
/*    const printMetodo = (req, res, next) => {
  console.log(`MIDDLEWARE -> ${req.method}`);
  if (req.method == "GET") {
    res.json("No soportamos GET");
  }
  next();
};

app.get("/", printMetodo, (req, res) => {
  res.status(200).json("ok");
});   */

app.get("/", (req, res) => {
  res.status(200).json("ok");
});

app.use("/api", librosRoutes);
app.use("/api", authorsRoutes);
//app.use("/api", printMetodo, usersRoutes);
app.use("/api", usersRoutes);
app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`Server funcionando en http://localhost:${port}`);
});
