const { CODE, MESSAGE } = require('../../services/http/http_status');
const pool = require("../../database").pool;
const queries = require('../queries');

rsv = {

    rsvRequests: async (req, res, next) =>{
        const chp_id = req.body.chp_id ;
        const user_id = req.body.user_id;
        console.log(req.body);
        pool.query(queries.getRsvRequests, [chp_id, user_id], (error, results) => {
            // const findchp = results.rows[0];
            if (error) {
               throw error
            }
            else {
                return res.status(200).json(results.rows)
            }
        })
    },
    getRsv: async (req, res, next) => {
        const chp_id = req.body.chp_id ;
        const user_id = req.body.user_id;

        pool.query(queries.getRsvRequests, [chp_id, user_id], (error, results) => {
            // const findchp = results.rows[0];
            if (error) {
                throw error
            }
            else {
                return res.status(200).json(results.rows)
            }
        })
    },
    getRsvHistory: async (req, res, next) =>{
        const chp_id = req.body.chp_id ;
        const user_id = req.body.user_id;

        pool.query(queries.getRsvHistory, [chp_id, user_id], (error, results) => {
            // const findchp = results.rows[0];
            if (error) {
                throw error
            }
            else {
                return res.status(200).json(results.rows)
            }
        })
    }
}

module.exports = rsv;