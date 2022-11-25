const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.static(__dirname + "/build"));

let corsOptions = {
  origin: "/api",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.sendFile("/build/index.html");
});

app.listen(3001, () => {
  console.log("Server is running : port 3001");
});
