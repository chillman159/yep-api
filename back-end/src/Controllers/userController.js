const { CODE, MESSAGE } = require('../../services/http/http_status');
const pool = require("../../database").pool;
const queries = require('../queries');
const bcrypt = require('bcryptjs');
const { createPassword, comparePassword } = require('../../services/brypt/brypt_middleware')

const user = {

    signup: async (req, res, next) => {
        const email = req.body.email || req.query.email || req.params.email || req.userpro.email;
        const firstname = req.body.firstname || req.query.firstname || req.params.firstname || req.userpro.firstname;
        const lastname = req.body.lastname || req.query.lastname || req.params.lastname || req.userpro.lastname;
        const birth_date = req.body.birth_date || req.query.birth_date || req.params.birth_date || req.userpro.birth_date;
        const statususer = req.body.statususer || req.query.statususer || req.params.statususer || req.userpro.statususer;
        const password = req.body.password || req.query.password || req.params.password || req.userpro.password;
        // let hashPassword = null;
        // hashPassword = await createPassword(password);
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt)
        pool.query(queries.insertUser, [email, firstname, lastname, birth_date, statususer, hash], (error, results) => {
            if (error) {
                throw error
            }
            else {
                // req.user = results.rows;
                res.status(CODE.CREATED).json({
                    CODE: CODE.CREATED,
                    MESSAGE: MESSAGE.CREATED,
                    User: results.rows
                })
            }
        })
    },
    findByEmail: async (req, res, next) => {
        const email = req.body.email || req.query.email || req.params.email || req.userpro.email;
        pool.query(queries.finduserByEmail, [email], (error, results) => {
            const findEmail = results.rows[0]
            if (findEmail) {
                res.status(CODE.SUCCESS).json({
                    CODE: CODE.SUCCESS,
                    message: "Email already exist"
                })
            }
            else {
                next();
            }
        })
    },
    findUserById: async (req, res, next) => {
        const user_id = req.body.user_id || req.query.user_id || req.params.user_id || req.userpro.user_id;
        pool.query(queries.findUserById, [user_id], (error, results) => {

            if (error) {
                console.log("a");
                throw error
            }
            else {
                res.status(CODE.SUCCESS).json({
                    CODE: CODE.SUCCESS,
                    User: results.rows

                })
            }
        })
    },

    updateUser: async (req, res, next) => {
        const user_id = req.body.user_id || req.query.user_id || req.params.user_id || req.userpro.user_id;
        const firstname = req.body.firstname || req.query.firstname || req.params.firstname || req.userpro.user_id;
        const lastname = req.body.lastname || req.query.lastname || req.params.lastname || req.userpro.lastname;
        const birth_date = req.body.birth_date || req.query.birth_date || req.params.birth_date || req.userpro.birth_date;
        const statususer = req.body.statususer || req.query.statususer || req.params.statususer || req.userpro.statususer;
        pool.query(queries.updateUserById, [user_id, firstname, lastname, birth_date, statususer], (error, results) => {
            if (error) {
                throw error
            }
            else {
                res.status(CODE.SUCCESS).json({
                    CODE: CODE.SUCCESS,
                    User: results.rows
                })
            }
        })

    },
    
    login: async (req, res, next) => {
        const email = req.body.email || req.query.email || req.params.email || req.userpro.email;
        const password = req.body.password || req.query.password || req.params.password || req.userpro.password;
        pool.query(queries.finduserByEmail, [email], (error, results) => {
            const findEmail = results.rows[0]
            // console.log(findEmail);
            if (!findEmail) {
                res.status(CODE.UNPROCESSABLE).json({
                    CODE: CODE.UNPROCESSABLE,
                    message: "Account  doesn't exist"
                })
            }
            
            else {
                 req.email = results.rows[0];
                 next ();
            }
        })

    }

}

module.exports = user;