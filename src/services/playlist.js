const knex = require("./db");

exports.getUserPlaylist = async (userId) => {
  try {
    const result = await knex.select('id','name').from('playlist').where('user_id',userId)
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
