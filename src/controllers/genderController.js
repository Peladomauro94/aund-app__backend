const genderService = require("../services/gender");

exports.getGenders = async (req, res) => {
  try{
    const genderList = await genderService.getGenders()

    return res.json(genderList);
  }catch(error){
    res.status(500).json({error:'error ocurred getting gender list'})
  }
};
