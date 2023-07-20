const knex = require('./db')

const createUser = async (userData) => {
  try{
    const result = await knex('users').insert(userData).returning("*")
    console.log('inserting user',result[0])
    return result[0]
  }catch(error){
    throw error;
  }
}

const getUserByUsername = async (username) => {
  try{
    const user = await knex('users').select().where({username}).first()
    return user;
  }catch(error){
    throw error;
  }
}

const getUserByEmail = async (email) => {
  try{
    const user = await knex('users').select().where({email}).first()
    return user;
  }catch(error){
    throw error;
  }
}


const getUserByUsernameOrEmail = async (identifier) => {
  try{
    const user = await knex('users').select().where('username',identifier).orWhere('email',identifier).first()
    return user;
  }catch(error){
    throw error;
  }
}


module.exports = {createUser,getUserByUsername,getUserByEmail, getUserByUsernameOrEmail}

