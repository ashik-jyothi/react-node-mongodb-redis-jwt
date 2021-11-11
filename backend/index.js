require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const PORT = process.env.PORT;

const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_CONN_STRING,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to mongodb.")
);

app.use(express.json());

const auth_routes = require("./routes/auth.route");
const user_routes = require("./routes/user.route");

app.use("/dashboard", user_routes);
app.use("/", auth_routes);

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT::${PORT}`));
