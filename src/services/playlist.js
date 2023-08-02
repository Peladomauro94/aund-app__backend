const { getRandomNumber } = require("../utils/randomNumer");
const knex = require("./db");
const { getSongIdsByArtist, getSongIdsByGender, getSongs } = require("./song");

async function getAllPlaylist() {
  try {
    const result = await knex
      .select("id", "name", "avatar_url")
      .from("playlists");
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

exports.getUserPlaylist = async (userId) => {
  try {
    const result = await knex
      .select("id", "name", "avatar_url")
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
      .select(
        "playlists.id as playlist_id",
        "playlists.name as playlist_name",
        "playlists.date",
        "playlists.user_id",
        "playlists.avatar_url",
        "playlist_songs.song_id",
        "songs.*",
        "artist.name as artist_name",
        "artist.img_url as artist_avatar"
      )
      .from("playlists")
      .where("playlists.id", playlistId)
      .leftJoin("playlist_songs", "playlist_songs.playlist_id", "playlists.id")
      .leftJoin("songs", "playlist_songs.song_id", "songs.id")
      .leftJoin("artist", "songs.artist_id", "artist.id")
      .orderBy("playlist_songs.id");


    if (!result[0]) {
      throw new Error("Playlist not found.");
    }

    const playlist = {
      playlist_id: result[0].playlist_id,
      playlist_name: result[0].playlist_name,
      date: result[0].date,
      user_id: result[0].user_id,
      avatar_url: result[0].avatar_url,
      songs: result.map((row) => ({
        id: row.song_id,
        name: row.name,
        time: row.time,
        artist_id: row.artist_id,
        album_id: row.album_id,
        gender_id: row.gender_id,
        listens: row.listens,
        artist_name: row.artist_name,
        avatar_url : row.img_url
      })),
    };
    return playlist;
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

exports.createPlaylistWithGenderList = async (genderList) => {
  try {
    let songList = [];
    const promises = [];

    genderList.forEach((item) => {
      const amountOfSongs = getRandomNumber(4,8);
      const genderSong = getSongIdsByGender(item, amountOfSongs);
      promises.push(genderSong);
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
    return playlist[0].id;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

exports.addSongsToPlaylist = async (playlistId, songList) => {
  try {

    let songData = songList.map((el) => {
      return {
        song_id: el.id,
        playlist_id: playlistId,
        random_order: Math.random()
      };
    });

    songData.sort((a, b) => a.random_order - b.random_order);

    songData.forEach((song) => delete song.random_order);


    await knex("playlist_songs").insert(songData);

    updatePlaylistAvatar(playlistId);

    return true;
  } catch (e) {
    // console.error(e)
    throw e;
  }
};

function updatePlaylistAvatar(playlistId) {
  try {
    const avatar = knex("playlist_songs")
      .select("artist.img_url")
      .where("playlist_id", playlistId)
      .leftJoin("songs", "songs.id", "playlist_songs.song_id")
      .leftJoin("artist", "artist.id", "songs.artist_id")
      .orderByRaw("RANDOM()")
      .first()
      .then((avatar) => {
        knex("playlists")
          .where("id", playlistId)
          .update({ avatar_url: avatar.img_url })
          .returning("*")
          .then();
      });
  } catch (e) {
    console.error(e);
  }
}
