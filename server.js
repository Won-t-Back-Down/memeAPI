const express = require("express");
const app = express();

const port = 3200;

app.get("/", (req, res) => {
  res.send("Sucess!!!!!!!!!!!!");
})

app.listen(port, () => {
  console.log(`Your app is listening on http://localhost:${port}`);
})