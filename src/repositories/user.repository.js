const { User } = require("../models");
const AppError = require("../utils/error/app-error");
const {SuccessResponse} = require("../utils/common"); 

const createUser = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    throw new AppError("Error creating user: " + error.message, 500);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Error fetching user", 500);
  }
};

const getUserWithReferrals = async (id) => {
  try {
    const user = await User.findByPk(id, {
      include: [{ model: User, as: "Referrals" }],
    });

    if (!user) {
      throw new AppError("No user with the given userId found", 404);
    }

    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Error in fetching referred user list", 500);
  }
};


const getUserByEmail = async (email) => {
  const res = await User.findOne({ where: { email } });
  return res;
};

module.exports = {
  createUser,
  getUserById,
  getUserWithReferrals,
  getUserByEmail,
};
