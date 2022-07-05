const config = {
    secret : process.env.JWT_SECRET,
    token : process.env.JWT_TOKEN,
    algorithm : process.env.JWT_ALGO,
    expiration : process.env.JWT_EXP
};

module.exports = config;