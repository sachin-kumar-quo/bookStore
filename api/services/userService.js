const User = require("../models/user");

const createUser = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
};

const getUser = async (userId) => {
  return await User.findById(userId);
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const getUsers = async () => {
  return await User.find();
};

const updateUser = async (userId, user) => {
  return await User.findByIdAndUpdate(userId, user);
};
const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
  getUsers,
  updateUser,
  deleteUser,
};
