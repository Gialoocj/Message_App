const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const authRouter = require("./routers/auth.routes");
const userRouter = require("./routers/user.routes");

app.use(express.json({}));
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`app is running on ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Ket noi thanh cong"))
  .catch((err) => {
    console.log("Loi server" + err);
    process.exit();
  });

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/users/", userRouter);
