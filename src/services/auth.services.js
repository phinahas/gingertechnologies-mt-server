const AppError = require('../utils/AppError');
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async ({ username, email, password }) => {
    try {
        const existing = await User.findOne({ email });
        if (existing) throw new AppError('User already exists', 409);

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        return { statusCode: 201, user, message: 'User registered successfully' };

    } catch (error) {
        throw new AppError(error.message, error.statusCode || 500);
    }

};

exports.loginUser = async ({ email, password }) => {

    try {

        const user = await User.findOne({ email });
        if (!user) throw new AppError('Invalid credentials', 401);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new AppError('Invalid credentials', 401);

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return { statusCode: 200, user, token };

    } catch (error) {
        throw new AppError(error.message, error.statusCode || 500);


    }


};

exports.checkUserExists = async ({ userId }) => {

    try {

        const user = await User.findById(userId);
        if (!user) return { statusCode: 409, message: 'User not found' };

        return { statusCode: 200, user };

    } catch (error) {
        return { message: error.message, statusCode: error.statusCode || 500 };

    }

}

exports.getUser = async ({ userId }) => {



    try {

        const user = await User.findById(userId);
        if (!user) throw new AppError('User not found', 409);

        return { statusCode: 200, user };

    } catch (error) {
        throw new AppError(error.message, error.statusCode || 500);
    }


}
