const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { db}=require("./config/db")
const userRoutes=require("./routes/UserRoutes");



const app = express();

app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      // <-- location of the react app were connecting to
      credentials: true,
    })
  );

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use (
    session ({
        key: "userId",
        secret: "abcd",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);


app.use("/api", userRoutes);


app.listen(5000, () => {
   console.log("running server");
});