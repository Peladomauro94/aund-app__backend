require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.APP_PORT || 3000;

const router = require("./routes/index");

const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});