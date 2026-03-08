const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const LISTINGROUTER = require("./router/listing");
const REVIEWROUTER = require("./router/review");
const USERROUTER = require("./router/user");
const SEARCHROUTER = require("./router/search");

const ExpressError = require("./utils/ExpressError");

// Environment variables
const ATLAS_DB_URL_ONE = process.env.ATLASDB_URL_ONE;
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cookieParser(process.env.TOKEN_KEY));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Connect DB
async function main() {
   mongoose.connect(ATLAS_DB_URL_ONE);
}

// Routes
app.use("/listing", SEARCHROUTER);
app.use("/listing", LISTINGROUTER);
app.use("/listing/:id/review", REVIEWROUTER);
app.use("/", USERROUTER);

// Serve React build
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

// Error handling
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).json({ message });
});

// Start server
main()
  .then(() => {
    console.log("Connection with DB Successful");
    app.listen(PORT, () => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });


