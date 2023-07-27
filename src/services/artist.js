const knex = require("./db");

exports.getArtists = async (cupido) => {
  try {
    const result = cupido ? await knex.select('*').from('artist').orderByRaw('RANDOM()') : await knex.select('*').from('artist')
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};