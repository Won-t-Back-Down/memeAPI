const express = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const cors = require('cors');

const { database } = require('./db');
//const { seed } = require("./data/index");
const { Meme } = require("./models/Meme");
const { User } = require("./models/User");

const SALT_COUNT = 9;
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
//View a meme
app.get('/:id', async (req, res) => {
  const singleMeme = await Meme.findByPk(req.params.id);
  res.json(singleMeme);
})
//Edit a meme
app.put(':/id', async (req, res) => {
  let editMeme = await Meme.update(req.body,
    {where: {id: req.params.id}});
  res.send("Updated.");
})
//Delete a meme
app.delete('/:id', async (req,res) =>{
  deleteMeme= await Meme.destroy(
      {where: {id: req.params.id}}
  );
  res.send("Deleted.");
})


// //Creating a register route
// app.post('/register', async (req,res,next) => {
//     const {username, password} = req.body;
//     const hashedPw = await bcrypt.hash(password,SALT_COUNT);
//     const user = await User.create({username, password:hashedPw});
//     const token = jwt.sign({id: user.id, username}, process.env.JWT_SECRET);
//     return {message: 'Thanks for registering! You can log in now.'}
// })

//Creating a log in route
app.post('/login', async (req,res,next) => {
   const {username, password} = req.body;
   const [foundUser] = await User.findAll({where: {username: username}});
   if (!foundUser) {
    res.send('User not found');
   }
   //const isMatch = await bcrypt.compare(password, foundUser.password);
   if(foundUser.password === password) {
    const token = jwt.sign(username, process.env.JWT_SECRET);
    res.send('You are now logged in successfully');
   } else {
    res.send('Failed login. Try again');
   }
})

app.listen(port, () => {
  database.sync({ force: false });
  console.log(`Your app is listening on http://localhost:${port}`);
})