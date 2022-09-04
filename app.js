const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const catRoutes = require("./routes/category");
const proRoues = require("./routes/product");
dotenv.config();
const app = express();

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", catRoutes);
app.use("/api",proRoues);

const port = process.env.PORT || 8000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(port, () => {
  console.log(`App is listining at ${port}`);
});
