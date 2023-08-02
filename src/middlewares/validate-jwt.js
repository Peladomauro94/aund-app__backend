const jwt = require('jsonwebtoken')

const TOKEN_SECRET = 'c5b62062-24f6-11ee-be56-0242ac120002'

const verifyToken = (req,res,next) => {
  const token = req.header('auth-token')
  if(!token){
    return res.status(401).json({error:'Access denied'})
  }

  try{
    const verified = jwt.verify(token,TOKEN_SECRET)
    req.user = verified
    next()
  }catch(e){
    res.status(401).json({error:'Invalid access token'})
  }
}

module.exports = {verifyToken,TOKEN_SECRET}