const knex = require("knex");
const knexFile = require("../../knexfile");

const environment = process.env.NODE_ENV || "dev";

module.exports = knex(knexFile[environment]);
