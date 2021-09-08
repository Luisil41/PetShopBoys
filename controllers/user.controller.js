const User = require("../models/User.model");

const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

const editById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    return res.json(user);

  } catch (error) {
    return next(error);
  }
};

const putById = async (req, res, next) => {
  const { id } = req.params;
  const { fullName,birthdate, email, password, avatar, phone, province, interest } = req.body

  try {

    const update = {};
    if(fullName) update.fullName = fullName;
    if(birthdate) update.birthdate = birthdate;
    if(email) update.email = email;
    //if(password) update.password = password;
    //if(avatar) update.avatar = avatar;
    if(phone) update.phone = phone;
    if(province) update.province = province;
    if(interest) update.interest = interest;


    const updateUser = await User.findByIdAndUpdate(id,update, { new: true });
    return res.redirect(`/user/${updateUser._id}`);

  } catch (error) {
    return next(error)
  }
}



module.exports = { getById, editById, putById };