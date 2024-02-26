const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

mongoose
  .connect(process.env.MONGO_BASE_URL, { useUnifiedTopology: true })
  .then(() => console.log("Database Connected!!"))
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server Berjalan Di Port ${PORT}`);
});
