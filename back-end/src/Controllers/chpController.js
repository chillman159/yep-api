const { CODE, MESSAGE } = require("../../services/http/http_status");
const pool = require("../../database").pool;
const queries = require("../queries");

const chp = {
  insertChp: async (req, res, next) => {
    // const chp_address = req.body.chp_address;
    // const chp_longitude = req.body.chp_longitude;
    // const chp_latitude = req.body.chp_latitude;
    // const chp_status = req.body.chp_status;
    // const chp_chargelevel = req.body.chp_chargelevel;
    // const chp_parkinglength = req.body.chp_parkinglength;
    // const chp_parkingheight = req.body.chp_parkingheight;
    // const chp_parkingtype = req.body.chp_parkingtype;
    // const chp_difficultyofaccess = req.body.chp_difficultyOfAccess;
    // const chp_description = req.body.chp_description;
    // const chp_user_id = req.body.chp_user_id;
    const {
      chp_address,
      chp_longitude,
      chp_latitude,
      chp_status,
      chp_chargelevel,
      chp_parkinglength,
      chp_parkingheight,
      chp_parkingtype,
      chp_difficultyofaccess,
      chp_description,
      chp_user_id,
    } = req.body;

    console.log(req.dody);
    pool.query(
      queries.insertChp,
      [
        chp_address,
        chp_longitude,
        chp_latitude,
        chp_status,
        chp_chargelevel,
        chp_parkinglength,
        chp_parkingheight,
        chp_parkingtype,
        chp_difficultyofaccess,
        chp_description,
        chp_user_id,
      ],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          res.status(CODE.CREATED).json({
            CODE: CODE.CREATED,
            MESSAGE: MESSAGE.CREATED,
            chp: results.rows,
          });
        }
      }
    );
  },
  updateChp: async (req, res, next) => {
    const chp_id = req.params.chp_id;
    const chp_address = req.body.chp_address;
    const chp_longitude = req.body.chp_longitude;
    const chp_latitude = req.body.chp_latitude;
    const chp_status = req.body.chp_status;
    const chp_chargelevel = req.body.chp_chargelevel;
    const chp_parkinglength = req.body.chp_parkinglength;
    const chp_parkingheight = req.body.chp_parkingheight;
    const chp_parkingtype = req.body.chp_parkingtype;
    const chp_difficultyofaccess = req.body.chp_difficultyofaccess;
    const chp_description = req.body.chp_description;
    const chp_user_id = req.body.chp_user_id;

    pool.query(queries.updateChp, [chp_id, chp_address], (error, results) => {
      console.log(chp_id);
      console.log(chp_address);
      if (error) {
        throw error;
      } else {
        res.status(CODE.SUCCESS).json({
          CODE: CODE.SUCCESS,
          MESSAGE: MESSAGE.SUCCESS,
          chp: results,
        });
      }
    });
  },
  findChpById: async (req, res, next) => {
    const chp_id = req.params.chp_id;
    pool.query(queries.findChpById, [chp_id], (error, results) => {
      const findchp = results.rows[0];
      if (!findchp) {
        res.status(CODE.UNPROCESSABLE).json({
          CODE: CODE.UNPROCESSABLE,
          Chp: " CHARGING POINT DOESN'T EXIST",
        });
      } else {
        res.status(CODE.SUCCESS).json({
          CODE: CODE.SUCCESS,
          MESSAGE: MESSAGE.SUCCESS,
          chp: findchp,
        });
      }
    });
  },
  findChpByUser: async (req, res, next) => {
    const user_id = req.body.user_id;
    pool.query(queries.findChpByUser, [user_id], (error, results) => {
      if (error) {
        throw error;
      } else {
        return res.status(200).json(results.rows);
      }
    });
  },
  deleteChp: async (req, res, next) => {
    const chp_id = req.query.chp_id;
    pool.query(queries.deleteChp, [chp_id], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.status(CODE.SUCCESS).json({
          CODE: CODE.SUCCESS,
          MESSAGE: MESSAGE.SUCCESS,
          Message: `Charging point deleted successfully`,
        });
      }
    });
  },
};

module.exports = chp;
