const { Meme } = require("./Meme");
const { User } = require("./User");

User.hasMany(Meme);
Meme.belongsTo(User);

module.exports = {
    Meme,
    User
}