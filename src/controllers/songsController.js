const songService = require("../services/song");

const getAllSongs = async (req, res) => {
  return res.json({ message: "songs" });
};

const getTopSongs = async (req, res) => {
  try {
    console.log("user id", req.user);
    const {id} = req.user
    const top = await songService.getTopSongs(id);
    return res.json(top);
  } catch (error) {
    res.status(404).json({ error: "an error ocurred" });
  }
};

module.exports = { getAllSongs, getTopSongs };
