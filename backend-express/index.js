const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require("./routes");

const port = process.env.port;

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api", router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
