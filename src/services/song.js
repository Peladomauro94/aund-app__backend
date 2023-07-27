const knex = require("./db");

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
        )
      )
      .from("songs")
      .orderBy("listens", 'DESC')
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
      .select("songs.id", "songs.name", knex.raw("'song' as type"))
      .from("songs")
      .leftJoin("artist", "songs.artist_id", "artist.id")
      .where("songs.name", "ILIKE", `%${searchTerm}%`)
      .orWhere('artist.name','ILIKE',`%${searchTerm}%`)

    const results = await knex
      .select("id", "name", knex.raw("'artist' as type")) // Agrega un alias 'type' para identificar los resultados como artistas
      .from("artist")
      .where("name", "ILIKE", `%${searchTerm}%`)
      .union(function () {
        this.select("id", "name", knex.raw("'album' as type")) // Agrega un alias 'type' para identificar los resultados como álbumes
          .from("albums")
          .where("name", "ILIKE", `%${searchTerm}%`);
      })
      .union(function () {
        this.select("id", "name", knex.raw("'playlist' as type")) // Agrega un alias 'type' para identificar los resultados como álbumes
          .from("playlist")
          .where("name", "ILIKE", `%${searchTerm}%`);
      });

    console.log(songResult,results);
    return [...songResult,...results];
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getSongIdsByArtist = async (artistId, limit) => {
  console.log('getting song by artist',artistId,limit)
  try {
    const songResult = await knex
      .select("id")
      .from("songs")
      .where("artist_id", artistId)
      .limit(limit || 999)
    // console.log(songResult)
    return songResult;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

module.exports = { getTopSongs, search, getSongIdsByArtist };
