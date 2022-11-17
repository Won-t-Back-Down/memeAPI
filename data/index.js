const {database} = require('../db');
const {User, Meme} = require('../models/index');
const {memes} = require("./memeData");
const {users} = require("./userData");

let seed = async () => {
    await database.sync({force:true});

        // Create the entries for them in their Models
    let memeEntries = await Meme.bulkCreate(memes);
    let userEntries = await User.bulkCreate(users);
}

module.exports = {
    seed
}