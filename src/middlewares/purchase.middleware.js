const { z } = require("zod");
const AppError = require("../utils/error/app-error");
const userRepository = require("../repositories/user.repository");
const purchaseRepository = require("../repositories/purchase.repository");

const purchaseSchema = z.object({
  userId: z.coerce.number({ required_error: "userId is required" }).int().positive(),
  amount: z.coerce.number({ required_error: "amount is required" }).positive("Amount must be greater than 0"),
});

const validatePurchase = async (req, res, next) => {
  try {
    const parsed = purchaseSchema.parse(req.body);
    const { userId } = parsed;

    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new AppError(`User with ID ${userId} does not exist`, 404);
    }

    req.body = parsed;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors.map(err => err.message).join(", ");
      return next(new AppError(`Validation Error: ${message}`, 400));
    }
    return next(error);
  }
};

const validatePurchaseIdParam = async (req, res, next) => {
  const idSchema = z.coerce.number().int().positive();
  try {
    const purchaseId = idSchema.parse(req.params.purchaseId);
    const purchase = await purchaseRepository.getPurchaseById(purchaseId);
    if (!purchase) {
      throw new AppError(`Purchase ID ${purchaseId} not found`, 404);
    }
    next();
  } catch (error) {
    return next(error instanceof z.ZodError
      ? new AppError('Invalid purchaseId parameter', 400)
      : error);
  }
};

module.exports = {
    validatePurchase,
    validatePurchaseIdParam
}
