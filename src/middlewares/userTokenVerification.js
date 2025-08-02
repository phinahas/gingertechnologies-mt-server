const jwt = require('jsonwebtoken');
const {checkUserExists} = require('../services/auth.services')

const AppError = require('../utils/AppError');

exports.checkUserToken = async (req, res, next) => {
    try {
        
        
        const token = req.headers.authorization;
        if (!token) throw new AppError('No token provided', 401);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const response = await checkUserExists({ userId: decoded.userId });
        if (response.statusCode !== 200) throw new AppError(response.message, response.statusCode);
       
        req.userId = response.user._id;
        next();
    } catch (error) {
        next(error);
    }
}