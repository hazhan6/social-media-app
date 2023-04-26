const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connection = require("./database/db");

app.use(express.json());
app.use(cors());

//permission for read-photo-files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRouter = require("./routers/auth.router");
const postsRouter = require("./routers/posts.router");

connection();

app.use("/api", authRouter);
app.use("/api", postsRouter);

app.listen(5000, () => console.log("Server is running at :5000!"));
