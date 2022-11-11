const express = require("express");
const app = express();
const connectionDB = require("./connection");
const cors = require("cors");
const router = require("./controllers/routes");
connectionDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/ecommerce", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server running"));
