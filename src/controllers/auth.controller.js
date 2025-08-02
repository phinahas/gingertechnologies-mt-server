const {loginUser,registerUser, getUser } = require('../services/auth.services');

exports.register = async (req, res, next) => {
  try {
    const response = await registerUser(req.body);
    res.status(response.statusCode).send({user:response.user,message:response.message});
  } catch (err) {
    
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const response = await loginUser(req.body);
    res.status(response.statusCode).send({ user:response.user, token:response.token });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    
    const response = await getUser({ userId: req.userId });
    res.status(response.statusCode).send({ user:response.user });
  } catch (err) {
    next(err);
  }
};


