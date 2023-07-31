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

exports.createPlaylistWithArtistList = async (req,res)=>{
  try{
    const {id} = req.user
    const {artistList} = req.body

    console.log(artistList,req.body)

    const playlistId = await playlistService.createPlaylist("Playlist generada",id)

    const playlistSong = await playlistService.createPlaylistWithArtistList(artistList)

    console.log('playlistSong',playlistSong,playlistId)

    await playlistService.addSongsToPlaylist(playlistId, playlistSong)

    return res.status(201).json({message:"playlist created",playlist_id:playlistId})
  }catch(error){
    console.error(error)
    res.status(500).json({error:'error ocurred getting playlist'})
  }
}

exports.getPlaylist = async (req,res)=>{
  try{
    const {id} = req.params;

    const result = await playlistService.getPlaylist(id)

    res.json(result)
  }catch(error){
    res.status(404).json({error:error.message})
  }
}