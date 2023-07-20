const isValidEmail = (email) =>{
  return email.includes("@") && email.includes(".")
}

module.exports = {isValidEmail}