const client = require('bcrypt');

class Bcrypt {

    constructor(client){
        this.client = client;
        this.salt = null;
        this.hash = null;
        this.compare = null;
    }

    async generateSalt(){
        try {
            this.salt = await this.client.genSalt(10);
            return this.salt;
        } catch(e){
            throw new Error(e.message);
        }
    }

    async hashPassword(password){
        try {
            this.hash = await this.client.hash(password, this.salt);
            return this.hash;
        } catch(e){
            throw new Error(e.message);
        }
    }

    async comparePassword(password, saved){
        try {
            this.compare = await this.client.compare(password, saved);
            return this.compare;
        } catch(e){
            throw new Error(e);
        }
    }
}

let bcrypt = new Bcrypt(client);

module.exports = bcrypt;