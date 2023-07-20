const knex = require("./db");

const getTopSongs = async (userId) => {
  try {
    console.time("request db")
    const result = await knex
      .select(
        "songs.id",
        "songs.name as sogn_name",
        "artist.name as artist_name",
        knex.raw('CASE WHEN song_user_like.user_id IS NOT NULL THEN true ELSE false END AS liked')
      )
      .from("songs")
      .limit("20")
      .join("artist", "songs.artist_id", "artist.id")
      .leftJoin('song_user_like', function(){
        this
          .on('songs.id', '=', 'song_user_like.song_id')
          .andOn('song_user_like.user_id','=',knex.raw("?",[userId]))
        
      })
      console.timeEnd("request db")
    return result;
  } catch (e) {
    console.error(e)
    throw e;
  }
};
module.exports = { getTopSongs };
