// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  dev: {
    client: 'pg',
    connection: {
      connectionString:'postgres://Peladomauro94:WC1Rl8ztYuFi@ep-little-flower-638515.us-east-2.aws.neon.tech/neondb',
      ssl:true
    }
  },
};
