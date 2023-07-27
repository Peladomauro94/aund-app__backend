const { getRandomNumber } = require("../utils/randomNumer");
const knex = require("./db");
const { getSongIdsByArtist } = require("./song");

exports.getUserPlaylist = async (userId) => {
  try {
    const result = await knex
      .select("id", "name")
      .from("playlists")
      .where("user_id", userId);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

exports.getPlaylist = async (playlistId) => {
  try {
    const result = await knex
      .select("playlists.id as playlist_id","playlists.name as playlist_name", "playlists.date", "playlists.user_id", "playlist_songs.song_id", "songs.*")
      .from("playlists")
      .where("playlists.id", playlistId)
      .leftJoin("playlist_songs","playlist_songs.playlist_id","playlists.id")
      .leftJoin("songs", "playlist_songs.song_id", "songs.id");

      
    const playlist = {
      playlist_id : result[0].playlist_id,
      playlist_name : result[0].playlist_name,
      date : result[0].date,
      user_id : result[0].user_id,
      songs : result.map((row)=>({
        id:row.song_id,
        name:row.name,
        time:row.time,
        artist_id:row.artist_id,
        album_id:row.album_id,
        gender_id:row.gender_id,
        listens:row.listens
      }))
    }
    return playlist
  } catch (e) {
    throw e;
  }
};

exports.createPlaylistWithArtistList = async (artistList) => {
  try {
    let songList = [];
    const promises = [];

    artistList.forEach((item) => {
      const amountOfSongs = getRandomNumber(2, 5);
      const artistSong = getSongIdsByArtist(item, amountOfSongs);
      promises.push(artistSong);
    });

    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then((res) => {
          songList = res.flat();
          resolve(songList);
        })
        .catch((err) => {
          rej(err);
        });
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

exports.createPlaylist = async (name, userId) => {
  try {
    const playlistData = {
      name,
      user_id: userId,
    };
    const playlist = await knex("playlists")
      .insert(playlistData)
      .returning("id", "date");
    console.log(playlist);
    return playlist[0].id;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

exports.addSongsToPlaylist = async (playlistId, songList) => {
  try {
    // console.log('log',playlistId,songList)

    const songData = songList.map((el) => {
      return {
        song_id: el.id,
        playlist_id: playlistId,
      };
    });

    await knex("playlist_songs").insert(songData);
    console.log("songs inserted!");
    return true;
  } catch (e) {
    // console.error(e)
    throw e;
  }
};
