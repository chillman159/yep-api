const { CODE, MESSAGE } = require('../../services/http/http_status');
const pool = require("../../database").pool;
const queries = require('../queries');

const  favoris = {
    insertfavoris: async (req, res, next) => {
        const user_id = req.body.user_id || req.query.user_id || req.params.user_id || req.favoris.user_id;
        const chp_id = req.body.chp_id || req.query.chp_id || req.params.chp_id || req.favoris.chp_id;
        pool.query(queries.insertfavoris, [user_id,chp_id], (error, results)=>{
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

    deletefavoris: async (req, res, next)=>{
        const id_favoris =   req.params.id_favoris || req.favoris.id_favoris;
        pool.query(queries.deletefavoris, [id_favoris], (error, results)=>{
            if(error){
                throw error
            }
            else{
                res.status(CODE.SUCCESS).json({
                    CODE: CODE.SUCCESS,
                    MESSAGE: MESSAGE.SUCCESS,
                    FAVORIS: `FAVORIS DELETD WITH SUCCESSFULL WITH IF ${id_favoris}`
                })
            }
        })
    }
}

module.exports = favoris;