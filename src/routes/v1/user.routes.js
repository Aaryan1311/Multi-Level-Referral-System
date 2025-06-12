/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing users and referrals
 */

const express = require("express");
const { UserController } = require("../../controllers");
const { userMiddleware } = require("../../middlewares");

const router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               referredBy:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Invalid input
 */
router.post("/", userMiddleware.validateUserBody, userMiddleware.checkDuplicateUser,
                userMiddleware.checkValidReferrer,  
                UserController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 */
router.get("/:userId", userMiddleware.validateUserIdParam, UserController.getUser);

/**
 * @swagger
 * /users/{id}/referrals:
 *   get:
 *     summary: Get user with referral info
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Referral data
 *       404:
 *         description: No user/referrals found
 */
router.get("/:userId/referrals", userMiddleware.validateUserIdParam, UserController.getUserWithReferrals);

module.exports = router;
