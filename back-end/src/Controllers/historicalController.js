const { CODE, MESSAGE } = require('../../services/http/http_status');
const pool = require("../../database").pool;
const queries = require('../queries');

const historical = {

    inserthistorical: async (req, res, next) => {
        const user_id = req.body.user_id || req.query.user_id || req.params.user_id || req.historical.user_id;
        const chp_id = req.body.chp_id || req.query.chp_id || req.params.chp_id || req.historical.chp_id;
        const price =  req.body.price || req.query.price || req.params.price || req.historical.price;
        const energy = req.body.energy || req.query.energy || req.params.energy || req.historical.energy;
        pool.query(queries.insertHistorical, [user_id,chp_id,price,energy], (error, results)=>{
            if(error){
                throw error
            }
            else{
                res.status(CODE.CREATED).json({
                    CODE: CODE.CREATED,
                    MESSAGE: MESSAGE.CREATED,
                    FAVORIS: results.rows[0]
                })
            }
        })

    },

    getAllHistorical: async (req,res,next)=>{
        pool.query(queries.getAllHistorical, (error,results)=>{
            if(error){
                throw error
            }
            else{
                res.status(CODE.SUCCESS).json({
                    CODE: CODE.SUCCESS,
                    MESSAGE: MESSAGE.SUCCESS,
                    FAVORIS: results.rows[0]
                })
            }
        })
    }
}

module.exports = historical;