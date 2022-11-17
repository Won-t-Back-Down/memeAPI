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

// app.get("/memes", async (req, res) => {
//   let memes = await Meme.findAll();
//   res.send(memes)
// });

app.get("/users", async (req, res) => {
  let users = await User.findAll();
  res.send(users)
});
//View a meme
router.get('/:id', async (req, res) => {
  const singleMeme = await Meme.findByPk(req.params.id);
  res.json(singleMeme);
})
//Edit a meme
router.put(':/id', async (req, res) => {
  let editMeme = await Meme.update(req.body,
    {where: {id: req.params.id}});
  res.send("Updated.");
})
//Delete a meme
router.delete('/:id', async (req,res) =>{
  deleteMeme= await Meme.destroy(
      {where: {id: req.params.id}}
  );
  res.send("Deleted.");
})

// GET route for single meme
app.get("/memes/:id", async (req, res) => {
  res.send(await Meme.findByPk(req.params.id));
});

// GET route to filter for a certain tag
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

// GET route for single user

// POST route to create a meme

// POST route to create/register a user

// DELETE route to delete a meme

// DELETE route to delete a user

// PUT route to update a meme

// PUT route to update a user

app.listen(port, () => {
  console.log(`Your app is listening on http://localhost:${port}`);
})