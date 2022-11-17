const express = require("express");
const { seed } = require("./data/index");
const { Meme } = require("./models/Meme");
const { User } = require("./models/User");

const app = express();
const port = 3200;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.send("Sucess!!!!!!!!!!!!");
})

app.get("/memes", async (req, res) => {
  let memes = await Meme.findAll();
  res.send(memes)
});

app.get("/users", async (req, res) => {
  let users = await User.findAll();
  res.send(users)
});

app.listen(port, () => {
  console.log(`Your app is listening on http://localhost:${port}`);
})