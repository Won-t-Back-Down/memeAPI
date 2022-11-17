const {database} = require('../db');
const {User, Meme} = require('../models/index');
const {memes} = require("./memeData");
const {users} = require("./userData");

let seed = async () => {
    await database.sync({force:true});

        // Create the entries for them in their Models
    let memeEntries = await Meme.bulkCreate(memes);
    let userEntries = await User.bulkCreate(users);

    let firstMeme = await memeEntries[0];
    let secondUser = await userEntries[1];

    console.log("Test 1: ", firstMeme);
    console.log("Test 2: ", secondUser);

    console.log("The database is populated... Test it out using a Local Server!")
}

module.exports = {
    seed
}