const knex = require("./db");

exports.getGenders = async () => {
  try {
    const result = await knex.select('*').from('genders')
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};