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
