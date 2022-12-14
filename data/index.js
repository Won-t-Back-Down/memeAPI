const { application } = require('express');
const {database} = require('../db');
const {User, Meme} = require('../models/index');
const {memes} = require("./memeData");
const {users} = require("./userData");