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
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
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
    // console.error('Error fetching user:', error);
    if( error instanceof AppError) {
      throw error;
    }
    throw new AppError('Error fetching user: ' + error.message, 500);
  }
};

async function getUserWithReferrals(req, res){
  try {
    // console.log(req.params);
    const userId  = req.params.userId;
    console.log('Fetching referrals for userId:', userId);
    const user = await userService.getUserWithReferrals(userId);

    const referrals = user.Referrals || [];

    if (referrals.length === 0) {
      SuccessResponse.message = "No users referred by this user";
      SuccessResponse.data = [];
      return res.status(200).send(SuccessResponse);
    }

    SuccessResponse.message = "Referrals fetched successfully";
    SuccessResponse.data = referrals;
    return res.status(200).json(SuccessResponse);

  } catch (error) {
    // console.error('Error in fetching referred user list:', error);
    if( error instanceof AppError) {
      throw error;
    }
    throw new AppError('Error in fetching referraed user list: ' + error.message, 500);
  }
};

module.exports = {
  createUser,
  getUser,
  getUserWithReferrals
};
