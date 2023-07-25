const playlistService = require("../services/playlist");

exports.getAllPlaylist = async (req, res) => {
  try{
    const {id} = req.user
    const userPlaylist = await playlistService.getUserPlaylist(id)

    return res.json(userPlaylist);
  }catch(error){
    res.status(500).json({error:'error ocurred getting playlist'})
  }
};
