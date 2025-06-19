require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT;
const fEApp = process.env.FRONT_END_APP;

const connection = require("./data/db");
const moviesRouter = require("./routers/moviesRouter.js");
const notFound = require("./middlewares/notFound.js");
const errorsHandler = require("./middlewares/errorsHandler.js");

app.use(cors({ origin: `${fEApp}` })); // middleware cors
app.use(express.static("public")); // middleware assets statici
app.use(express.json()); // middleware body parser

app.get("/", (req, res) => {
  res.json({ message: "Server del mio movie database" });
});

app.use("/movies", moviesRouter);

app.use(errorsHandler); // middleware error 500

app.use(notFound); // middleware error 404

app.listen(port, () => {
  console.log(`Il server è in ascolto sulla porta ${port}`);
});
