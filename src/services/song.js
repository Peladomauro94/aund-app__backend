const knex = require("./db");

const getSongs = async () => {
  try {
    const songResult = await knex.select("id", "name").from("songs");
    return songResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getTopSongs = async (userId) => {
  try {
    console.time("request db");
    const result = await knex
      .select(
        "songs.id",
        "songs.name as sogn_name",
        "artist.name as artist_name",
        knex.raw(
          "CASE WHEN song_user_like.user_id IS NOT NULL THEN true ELSE false END AS liked"
        ),
        "songs.img_url as img_url"
      )
      .from("songs")
      .orderBy("listens", "DESC")
      .limit("20")
      .join("artist", "songs.artist_id", "artist.id")
      .leftJoin("song_user_like", function () {
        this.on("songs.id", "=", "song_user_like.song_id").andOn(
          "song_user_like.user_id",
          "=",
          knex.raw("?", [userId])
        );
      });
    console.timeEnd("request db");
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const search = async (searchTerm) => {
  try {
    const songResult = await knex
      .select(
        "songs.id",
        "songs.name",
        knex.raw("'song' as type"),
        "artist.name as artist_name",
        "songs.img_url"
      )
      .from("songs")
      .leftJoin("artist", "songs.artist_id", "artist.id")
      .where("songs.name", "ILIKE", `%${searchTerm}%`)
      .orWhere("artist.name", "ILIKE", `%${searchTerm}%`);

    const results = await knex
      .select(
        "artist.id",
        "artist.name",
        knex.raw("'artist' as type"),
        "artist.img_url"
      ) // Agrega un alias 'type' para identificar los resultados como artistas
      .from("artist")
      .where("artist.name", "ILIKE", `%${searchTerm}%`)
      .union(function () {
        this.select(
          "albums.id",
          "albums.name",
          knex.raw("'album' as type"),
          "artist.img_url"
        ) // Agrega un alias 'type' para identificar los resultados como álbumes
          .from("albums")
          .where("albums.name", "ILIKE", `%${searchTerm}%`)
          .leftJoin("artist", "albums.artist_id", "artist.id");
      })
      .union(function () {
        this.select(
          "playlists.id",
          "playlists.name",
          knex.raw("'playlist' as type"),
          knex.raw("''")
        ) // Agrega un alias 'type' para identificar los resultados como álbumes
          .from("playlists")
          .where("playlists.name", "ILIKE", `%${searchTerm}%`);
      });

    console.log(songResult, results);
    return [...results, ...songResult];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getSongIdsByArtist = async (artistId, limit) => {
  console.log("getting song by artist", artistId, limit);
  try {
    const songResult = await knex
      .select("id")
      .from("songs")
      .where("artist_id", artistId)
      .limit(limit || 999)
      .orderByRaw("RANDOM()");
    // console.log(songResult)
    return songResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getSongIdsByGender = async (genderId, limit) => {
  console.log("getting song by gender", genderId, limit);
  try {
    const songResult = await knex
      .select("name")
      .from("songs")
      .where("gender_id", genderId)
      .limit(limit || 999)
      .orderByRaw("RANDOM()");
    // console.log(songResult)
    return songResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const updateSongImg = async (songId, img_url) => {
  try {
    knex("songs")
      .where("id", songId)
      .update({ img_url:img_url })
      .then(()=>console.log('UPDATED SONG #'+songId));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  getSongs,
  getTopSongs,
  search,
  getSongIdsByArtist,
  getSongIdsByGender,
  updateSongImg
};
