const Sequelize = require("sequelize");
const { database } = require("../db");

const Meme = database.define("meme", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    caption: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tags: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    }
});

module.exports = {
    Meme
}