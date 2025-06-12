/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Endpoints related to user purchases and earnings distribution
 */

const express = require("express");
const { PurchaseController } = require('../../controllers');
const { purchaseMiddleware } = require('../../middlewares');
const { userMiddleware } = require('../../middlewares');

const router = express.Router();

/**
 * @swagger
 * /purchases:
 *   post:
 *     summary: Create a purchase
 *     tags: [Purchases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 4
 *                 description: Existing user ID
 *               amount:
 *                 type: number
 *                 example: 2000
 *                 description: Purchase amount
 *             required:
 *               - userId
 *               - amount
 *     responses:
 *       200:
 *         description: Purchase created (earnings distributed if applicable)
 *       404:
 *         description: User not found
 */
router.post("/", purchaseMiddleware.validatePurchase, 
    PurchaseController.createPurchase);

/**
 * @swagger
 * /purchases/{id}:
 *   get:
 *     summary: Get purchase by ID
 *     tags: [Purchases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Purchase ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Purchase details returned
 *       404:
 *         description: Purchase not found
 */
router.get("/:purchaseId", 
    purchaseMiddleware.validatePurchaseIdParam,
    PurchaseController.getPurchaseById);

/**
 * @swagger
 * /purchases/user/{userId}:
 *   get:
 *     summary: Get all purchases made by a specific user
 *     tags: [Purchases]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of user's purchases
 *       404:
 *         description: User not found or has no purchases
 */
router.get("/user/:userId", 
    userMiddleware.validateUserIdParam,
    PurchaseController.getPurchasesByUserId);

module.exports = router;
