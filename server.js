const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const cors = require("cors");

const { database } = require("./db");
const { seed } = require("./data/seed");
const { Meme } = require("./models/Meme");
const { User } = require("./models/User");

const SALT_COUNT = 9;
const app = express();
const port = 3200;

const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Sucess!!!!!!!!!!!!");
});

// app.get("/memes", async (req, res) => {
//   let memes = await Meme.findAll();
//   res.send(memes)
// });

//Edit a meme
app.put("/memes/:id", async (req, res) => {
  let editMeme = await Meme.update(req.body, { where: { id: req.params.id } });
  res.send("Updated.");
});

//Delete a meme
app.delete("/memes/:id", async (req, res) => {
  deleteMeme = await Meme.destroy({ where: { id: req.params.id } });
  res.send("Deleted.");
});

// GET route for single meme
app.get("/memes/:id", async (req, res) => {
  res.send(await Meme.findByPk(req.params.id));
});

// GET route to view all memes and filter for a certain tag
app.get("/memes", async (req, res, next) => {
  try {
    const memes = await Meme.findAll();
    const { tags } = req.query;
    const filteredMemes = memes.filter((meme) => {
      if (tags && !meme.tags.includes(tags)) {
        return;
      }
      return meme;
    });
    res.send(filteredMemes);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET route to view all users
app.get("/users", async (req, res) => {
  let users = await User.findAll();
  res.send(users);
});

// GET route for single user
app.get("/users/:id", async (req, res) => {
  res.send(await Users.findByPk(req.params.id));
});

// POST route to create a meme
app.post("/memes", async (req, res) => {
  let newMeme = await Meme.create(req.body);
  res.send(await Meme.findAll());
});

// app.post("/memes" , async (req, res) => {
//   const memes1 = await Memes.create(req.body);
//   res.json(memes1);
// })

// POST route to create/register a user
// app.post("/register", async (req,res)=>{
//   const signMeUp = await User.create(req.body);
//   res.json(signMeUp);
// })

// DELETE route to delete a user
app.delete("/user/:id", async (req, res) => {
  let deletedUser = user.splice(req.params.id - 1, 1);
  res.json(deletedUser);
});

// PUT route to update a user
app.put("register/:id", async (req, res) => {
  let editUser = await User.update(req.body, { where: { id: req.params.id } });
  res.send("Updated.");
});

//Creating a register route
app.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  const hashedPw = await bcrypt.hash(password, SALT_COUNT);
  const user = await User.create({ username, password: hashedPw });
  const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET);
  res.send("Thanks for registering! You can log in now.");
});

//Creating a log in route
app.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ where: { username: username } });
  if (!foundUser) {
    res.send("User not found");
  }
  if (foundUser) {
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (isMatch) {
      const token = jwt.sign(username, process.env.JWT_SECRET);
      res.send("You are now logged in successfully");
    } else {
      res.send("Failed login. Try again");
    }
  }
});

app.listen(port, () => {
  database.sync({ force: false });
  console.log(`Your app is listening on http://localhost:${port}`);
});
