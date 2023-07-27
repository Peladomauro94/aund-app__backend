const artistService = require("../services/artist");

exports.getAllArtist = async (req, res) => {
  try{
    const {id} = req.user
    const artistList = await artistService.getArtists()

    return res.json(artistList);
  }catch(error){
    res.status(500).json({error:'error ocurred getting artist list'})
  }
};
