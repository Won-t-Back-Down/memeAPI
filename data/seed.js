const { database } = require("../db");
const { User, Meme } = require("../models/index");
const { memes } = require("./memeData");
const { users } = require("./userData");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const SALT_COUNT = 9;

const JWT_SECRET = process.env.JWT_SECRET;

//File for if you want to use data you already made up
let seed = async () => {
  await database.sync({ force: true });

  let memeEntries = await Meme.bulkCreate(memes);

  // Create the entries for them in their Models
  for (let user of users) {
    const { first_name, last_name, username, password, isAdmin } = user;
    const hashedPw = await bcrypt.hash(password, SALT_COUNT);
    const newUser = await User.create({
      first_name,
      last_name,
      username,
      password: hashedPw,
      isAdmin,
    });
    // const token = jwt.sign({ id: newUser.id, username }, process.env.JWT_SECRET);
  }

  let firstMeme = await Meme.findByPk(1);
  let secondMeme = await Meme.findByPk(2);
  let thirdMeme = await Meme.findByPk(3);
  let fourthMeme = await Meme.findByPk(4);
  let bobby = await User.findByPk(1);
  let billy = await User.findByPk(2);
  let franky = await User.findByPk(3);

  await bobby.addMeme(firstMeme);
  await bobby.addMeme(secondMeme);
  await billy.addMeme(thirdMeme);
  await franky.addMeme(fourthMeme);

  // console.log("Test 1: ", firstMeme);
  // console.log("Test 2: ", secondUser);

  // console.log("The database is populated... Test it out using a Local Server!")
};

seed();
//node data/seed
