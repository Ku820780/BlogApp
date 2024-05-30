const mongoose = require("mongoose");
const express = require("express");
const cookies = require("cookie-parser");
const cors = require("cors");
const { userRoute} = require("./Routes/userRoute");
const { postRoute } = require("./Routes/postRoute");
const config = require("./Util/Config");

const app = express();

mongoose
  .connect(config.database)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error in DB: " + err.message));

app.use(express.json());
app.use(cookies());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(express.static("Public"));
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

// Stop crashing
process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

app.listen(config.port, () => {
  console.log(`Server Running on Port ${config.port}`);
});
