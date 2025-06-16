const express = require("express");
const connection = require("./data/db");
const app = express();
const port = 3000;
const moviesRouter = require("./routers/moviesRouter.js");
const notFound = require("./middlewares/notFound.js");
const errorsHandler = require("./middlewares/errorsHandler.js");

app.use(express.static("public")); // middleware assets statici

app.use(express.json()); // middleware body parser

app.get("/", (req, res) => {
  res.json({ message: "Server del mio movie database" });
});

app.use("/movies", moviesRouter);

app.listen(port, () => {
  console.log(`Il server è in ascolto sulla porta ${port}`);
});

app.use(errorsHandler); // middleware error 500

app.use(notFound); // middleware error 404
