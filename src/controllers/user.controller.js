const userService = require('../services/user.service');
const { SuccessResponse } = require('../utils/common');
const AppError = require('../utils/error/app-error');

async function createUser(req, res) {
  try {
    const { name, email, referrerId } = req.body;

    const user = await userService.createUser({ name, email, referrerId });

    SuccessResponse.message = 'User created successfully';
    SuccessResponse.data = user;

    return res.status(201).json(SuccessResponse);
  } catch (error) {
    next(error);
  }
};

async function getUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    SuccessResponse.message = 'User retrieved successfully';
    SuccessResponse.data = user;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    next(error);
  }
};

async function getUserWithReferrals(req, res) {
  try {
    const { userId } = req.params;
    const user = await userService.getUserWithReferrals(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    SuccessResponse.message = 'User with referrals retrieved successfully';
    SuccessResponse.data = user;

    return res.status(200).json(SuccessResponse);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUser,
  getUserWithReferrals
};
