const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const cors = require("cors");
var Jwt = require('express-jwt');

const { database } = require('./db');

//const { seed } = require("./data/seed");
const { Meme } = require("./models/index");
const { User } = require("./models/index");

const SALT_COUNT = 9;
const app = express();
const port = 3200;

const JWT_SECRET = process.env.JWT_SECRET;

//Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Custom middleware
//Authorizing user with jwt token
let authUser = async (req, res, next) => {
  const auth = req.header("Authorization");
  if(!auth){
    console.log("User is not authorized!");
    next();
  } else {
    console.log("User is authorized!");
    const [, token] = auth.split(" ");
    const user = jwt.verify(token, JWT_SECRET);
    next();
  }
}

app.get("/", (req, res) => {
  res.send("Welcome to Meme4Me");
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
app.delete('/memes/:id', async (req,res) =>{
  deleteMeme= await Meme.destroy(
      {where: {id: req.params.id}}
  );
  res.send("Deleted.");
});

// GET route for single meme
app.get("/memes/:id", async (req, res) => {
  res.send(await Meme.findByPk(req.params.id));
});

// GET route to view a meme's associated data (user/creator info)
app.get("/memes/:id/info", async (req, res) => {
  const meme = await Meme.findByPk(req.params.id);
  res.send(await meme.getUser());
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
  res.send(await User.findByPk(req.params.id));
});

// POST route to create a meme
app.get("/users/:id/memes", async (req, res) => {
  let user = await User.findByPk(req.params.id);
  res.send(await user.getMemes());
});

// POST route to create a meme
app.post("/memes", async (req, res) => {
  let newMeme = await Meme.create(req.body);
  res.send(await Meme.findAll());
});

// POST route for a user to create meme
app.post("/users/:id/memes", async (req, res) => {
  const foundUser = await User.findByPk(req.params.id);
  const newMeme = await Meme.create(req.body);
  await foundUser.addMeme(newMeme.id);
  res.send(await foundUser.getMemes());
});

// GET route for all of a single user's memes
app.get("/users/:id/memes", async (req, res) => {
  let user = await User.findByPk(req.params.id);
  res.send(user.getMemes)
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
app.delete("/users/:id", async (req, res) => {
  let deletedUser = user.splice(req.params.id - 1, 1);
  res.json(deletedUser);
});

// PUT route to update a user
app.put("/users/:id", async (req, res) => {
  let editUser = await User.update(req.body, { where: { id: req.params.id } });
  res.send("Updated.");
});

//Creating a register route
app.post("/register", async (req, res, next) => {
  const { first_name, last_name, username, password } = req.body;
  const hashedPw = await bcrypt.hash(password, SALT_COUNT);
  const user = await User.create({ first_name, last_name, username, password: hashedPw, isAdmin: false });
  const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET);
  res.send("Thanks for registering! You can log in now.");
});

//Creating a log in route
app.post("/login", authUser, async (req, res, next) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ where: { username: username } });
  if (!foundUser) {
    res.send("User not found");
  }
  if (foundUser) {
    const isMatch = bcrypt.compareSync(password, foundUser.password);
    if (isMatch) {
      const token = jwt.sign(username, process.env.JWT_SECRET);
      res.send({message: "You are now logged in", token});
    } else {
      res.send("Failed login. Try again");
    }
  }
});

// var jwtCheck = Jwt({
//   secret: 'fq1Cw14avEya7mk8lwGLadgOectgPnUp',
//   audience: 'https://meme4me',
//   issuer: 'https://dev-1rt78v4rb6srtnzd.us.auth0.com/'
// });

// // enforce on all endpoints
// app.use(jwtCheck);

// app.get('/authorized', function (req, res) {
//     res.send('Secured Resource');
// });


app.listen(port, () => {
  database.sync({ force: false });
  console.log(`Your app is listening on http://localhost:${port}`);
});
