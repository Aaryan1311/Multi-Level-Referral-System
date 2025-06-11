const userRepository = require('../repositories/user.repository');
const { AppError } = require('../utils/error/app-error');

const createUser = async ({name, email, referrerId}) => {
    try {
        const user = await userRepository.createUser({name, email, referrerId});
        return user;
    } catch (error) {
        throw new AppError('Error creating user: ' + error.message, 500);
    }
};

const getUserById = async (id) => {
    try {
        const user = await userRepository.getUserById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        return user;
    } catch (error) {
        throw new AppError('Error fetching user: ' + error.message, 500);
    }
};

const getUserWithReferrals = async (id) => {
    try {
        const user = await userRepository.getUserWithReferrals(id);
        if (!user){
            throw new AppError('User with referrals not found', 404);
        }
        return user;
    } catch (error) {
        throw new AppError('Error fetching user with referrals: ' + error.message, 500);
    }
};

module.exports = {
    createUser,
    getUserById,
    getUserWithReferrals
};