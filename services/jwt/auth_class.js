class Authentification{

    constructor(client, config){
        this.client = client;
        this.config = config;
    }

    createToken(id, expiration){
        let token = this.client.sign({
            userpro_id : id
        }, this.config.secret, {
            expiresIn : expiration
        })
        return token;
    }

    createEmailToken(email, user_id, expiration){
        let token = this.client.sign({
            email : email,
            userpro_id : user_id,
        }, this.config.secret, {
            expiresIn : expiration
        })
        return token;
    }

};

module.exports = Authentification;