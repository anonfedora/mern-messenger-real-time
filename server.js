const express = require("express");
const app = express();
const databaseConnect = require("./backend/config/database.js");
const authRouter = require("./backend/routes/authRoute");
const getFriends = require("./backend/routes/messengerRoute");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(cors());

// Have Node serve the files for our built React app

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/messenger", authRouter);
app.use("/api/messenger", getFriends);

const PORT = process.env.PORT || 5000;
// app.get("/", (req, res) => {
//   res.send("This is from frontend");
// });

app.use(express.static(path.join(__dirname, "./frontend/build")));
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
});
databaseConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
