const { z } = require("zod");
const AppError = require("../utils/error/app-error");
const userRepository = require("../repositories/user.repository");

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  referrerId: z.coerce.number().int().positive().optional(),
});

function validateUserBody(req, res, next) {
  if (!req.body || typeof req.body !== "object") {
    return next(new AppError("Request body must be an object", 400));
  }
  const { name, email } = req.body;
  if (!name || !email) {
    return next(new AppError("Both name and email are required fields", 400));
  }

  try {
    const parsedData = userSchema.parse(req.body);
    req.body = parsedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => err.message).join(", ");
      return next(new AppError(`Validation error: ${errorMessages}`, 400));
    }
    return next(error);
  }
}

async function checkValidReferrer(req, res, next) {
  const { referrerId } = req.body;

  if (!referrerId) {
    return next();
  }

  try {
    const referrer = await userRepository.getUserById(referrerId);

    if (!referrer) {
      throw new AppError("Invalid referrerId: user does not exist", 400);
    }

    const referrerWithReferrals = await userRepository.getUserWithReferrals(
      referrerId
    );

    const referralCount = referrerWithReferrals.Referrals?.length || 0;

    if (referralCount >= 8) {
      throw new AppError(
        "Referrer has reached the maximum of 8 referrals",
        400
      );
    }

    next();
  } catch (error) {
    return next(
      error instanceof AppError
        ? error
        : new AppError("Database error while checking referrer", 500)
    );
  }
}

async function checkDuplicateUser(req, res, next) {
  const { email } = req.body;

  try {
    const existingUser = await userRepository.getUserByEmail(email);

    if (existingUser) {
      return next(new AppError("User with this email already exists", 409));
    }

    next();
  } catch (error) {
    return next(
      new AppError("Database error while checking for duplicate user", 500)
    );
  }
}

const validateUserIdParam = async (req, res, next) => {
  const idSchema = z.coerce.number().int().positive();
  try {
    const userId = idSchema.parse(req.params.userId);
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new AppError(`User ID ${userId} not found`, 404);
    }
    next();
  } catch (error) {
    
    return next(error instanceof z.ZodError
      ? new AppError('Invalid userId parameter', 400)
      : error);
  }
};


module.exports = {
  validateUserBody,
  checkValidReferrer,
  checkDuplicateUser,
  validateUserIdParam
};
