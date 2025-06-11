const express = require('express');
const router = express.Router();
const { UserController }= require('../../controllers');
const { userMiddleware } = require('../../middlewares');
router.post(
  '/',
  userMiddleware.validateUserBody,
  userMiddleware.checkDuplicateUser,
  userMiddleware.checkValidReferrer,
  UserController.createUser
);

router.get('/:userId', UserController.getUser);

router.get('/:userId/referrals', UserController.getUserWithReferrals);

module.exports = router;
