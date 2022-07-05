const bcrypt = require('./brypt_class');

const bcryptMiddleware = {

    createPassword : async(password) => {
        let salt = null; 
        let hash = null; 
        try {
            salt = await bcrypt.generateSalt();
            hash = await bcrypt.hashPassword(password);
            return hash;
        } catch(e){
           throw new Error(e.message);
        }
    },

    comparePassword : async(password, savedPassword) => {
        let compare = null;
        try {
            compare = await bcrypt.comparePassword(password, savedPassword);
            return compare;
        } catch(e){
            throw new Error(e.message);
        }
    }
};

module.exports = bcryptMiddleware;