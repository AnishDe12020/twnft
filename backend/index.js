const express = require("express");
const cors = require("cors");

const app = express();

const whitelist = ["http://localhost:3000", "https://twnft.vercel.app"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.get("/", cors(), (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`TwNFT Backend listening on port ${process.env.PORT || 4000}!`);
});
