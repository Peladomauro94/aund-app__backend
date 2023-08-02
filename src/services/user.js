const knex = require('./db')

const createUser = async (userData) => {
  try{
    const result = await knex('users').insert(userData).returning("*")
    return result[0]
  }catch(error){
    throw error;
  }
}

const getUserByUsername = async (username) => {
  try{
    console.log(username)
    const user = await knex('users').select().where('username',username).first()
      console.log('result user by username',user)
    return user;
  }catch(error){
    throw error;
  }
}

const getUserByEmail = async (email) => {
  try{
    console.log(email)
    const user = await knex('users').select().where('email',email).first()

    console.log('result user by email',user)
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

