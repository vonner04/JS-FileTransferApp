const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

const corsOptions = {
  origin: "http://localhost:5173", //Added the front-end URL as the server's origin is different from the front-end's.
  credentials: true, //Not sure what this does yet.
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Yozah") 
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${server.address().port}`)
});