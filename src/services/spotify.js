const axios = require("axios");

const token =
  "BQCF9skaSexNIPROx5MjoQaAcUTnPMy1voa1SahzqP4SZLtJhCM5aDDkDRrfH2r3oyAXIfUXStx4cVtcRZLUfLXXjtvuHh5dkJg9MnPJWB4AlsxiqpPj2r3WUzf2AcZjd6pjdKLF-h0ZKCKKviSgm5ICeb0Lb-dOupU7o0oaXQUyBCrvx3NYZq3MOQnLXxxQqVvtx6bhkM2CxZ4IvpdMpS20HY06sMOyc7IxWsv0a_5PnoTzLd9y0E1kjaMevFd5rHjJ0b8Edg";

const songService = require("./src/services/song");

async function getSongImages() {
  const songs = await songService.getSongs();
  // songs.forEach(async (element) => {
    const searchQuery = 'La Crema';
    try {
      const result = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const img_url = result.data.tracks.items[0]
      console.log(img_url)
      console.log(
        `img for song ${searchQuery} is ${img_url}`
      );
      // songService.updateSongImg(element.id, img_url)
    } catch (e) {
      console.error(`error ocurred on song ${searchQuery}`);
    }
  // });
};