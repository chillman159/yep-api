const Authentification = require('./auth_class');
const jwt = require('jsonwebtoken');
const config = require('./config');
const { MESSAGE, CODE } = require('./../http/http_status');


const authMiddleware = {
	
	createToken : (id, expiration = 86000) => {
		const auth = new Authentification(jwt, config).createToken(id, expiration);
		return auth;
	},
	
	createEmailToken : (email, user_id, expiration = 86000) => {
		const auth = new Authentification(jwt, config).createEmailToken(email, user_id, expiration);
		return auth;
	},
	
	verifyToken : (req, res, next) => {
		let token = req.body.token || req.query.token || req.params.token || req.headers['x-access-token'] || req.headers['authorization'];
		if(token){
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if(err){
					return res.status(CODE.NOTFOUND).json({
						success : false,
						message : 'authentication expired',
						error : err
					});
				} else {
					req.accompagnateur = decoded;
					next();
				}
			});

		} else {
			return res.status(CODE.NOTSUCCESS).send({
				success: false,
				message: 'No token provided.'
			});
		}
	}
};

module.exports = authMiddleware;