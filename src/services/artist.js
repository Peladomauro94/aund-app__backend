const knex = require("./db");

exports.getArtists = async () => {
  try {
    const result = await knex.select('*').from('artist')
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};