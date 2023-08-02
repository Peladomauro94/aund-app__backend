const axios = require("axios");

const token = 'BQBdWdf9KUytSRG3N0lBbjMIQBkiqi7NOj5PakGUzGb7Nw9GAa4jAuPAPX_n8sSoyi4NHfuagCZSZIlOZ9aRqKfvlUQ3O08QWpODTo4FyrqHhxx6C2kB4ndAONd81sWNxXeyZSUKVYlP6nIx56s4231jYz4OdDHIZlL4VEBJaDHDNwa-nKezN9HLEyexwo13f6aIAGGi-RwigTJ84v4WDo0aNBoJ-ZVpGJG7tzz1ytEHdA2w5vyaKWnkHE3Is24c7b5lyRYHCA';


const songService = require("./song");

module.exports.getSongImages = async() => {
  const songs = await songService.getSongs();
  // songs.forEach(async (element) => {
    const searchQuery = "Maquiavélico Canserbero";
    try {
      const result = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const img_url = result.data.tracks.items[0].album.images[1].url
      console.log(img_url)
      console.log(
        `img for song ${searchQuery} is ${img_url}`
      );
      // songService.updateSongImg(element.id, img_url)
    } catch (e) {
      console.error(`error ocurred on song ${searchQuery}`,e);
    }
  // });
};