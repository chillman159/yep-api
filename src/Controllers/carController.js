const { CODE, MESSAGE } = require('../../services/http/http_status');
const pool = require("../../database").pool;
const queries = require('../queries');


const car = {
    insertCar: async (req, res, next)=>{
        const user_id = req.body.user_id || req.query.user_id || req.params.user_id || req.car.user_id;
        const image_car = req.body.image_car || req.query.image_car || req.params.image_car || req.car.image_car;
        const car_type = req.body.car_type || req.query.car_type || req.params.car_type || req.car.car_type;
        const plug_type = req.body.plug_type || req.query.plug_type || req.params.plug_type || req.car.plug_type;
        const car_width = req.body.car_width || req.query.car_width || req.params.car_width || req.car.car_width;
        const car_length = req.body.car_length || req.query.car_length || req.params.car_length || req.car.car_length;
        const battery_capacity = req.body.battery_capacity || req.query.battery_capacity || req.params.battery_capacity || req.car.battery_capacity;
        pool.query(queries.insertCar, [user_id, image_car, car_type, plug_type, car_width, car_length, battery_capacity], (error, results)=>{
            if(error){
                throw error
            }
            else{
                res.status(CODE.CREATED).json({
                    CODE: CODE.CREATED,
                    MESSAGE: MESSAGE.CREATED,
                    Car: results.rows
                })
            }
        })
    },
    findAllCars: async (req, res, next)=>{
        pool.query(queries.findCars,  (error, results)=>{
            if(error){
                throw error
            }
            else{
                res.status(CODE.SUCCESS).json({
                    CODE: CODE.SUCCESS,
                    MESSAGE: MESSAGE.SUCCESS,
                    Car: results.rows
                })
            }
        })
    },
    findCarById: async(req, res, next)=>{
        const car_id =  req.query.car_id || req.params.car_id || req.car.car_id;
        pool.query(queries.findCarByID, [car_id], (error, results)=>{
            if(error){
                throw error
            }
            else{
                res.status(CODE.SUCCESS).json({
                    CODE: CODE.SUCCESS,
                    MESSAGE: MESSAGE.SUCCESS,
                    Car: results.rows
                })
            }
        })
    },

    findCarByUserId : async (req, res, next)=>{
        const user_id =  req.query.user_id || req.params.user_id || req.car.user_id;
        pool.query(queries.findCarByUserId, [user_id], (error, results)=>{
            if(error){
                throw error
            }
            else{
                res.status(CODE.SUCCESS).json({
                    CODE: CODE.SUCCESS,
                    MESSAGE: MESSAGE.SUCCESS,
                    Car: results.rows
                })
            }
        })

    },


    UpdateCars: async (req, res, next)=> {
        const car_id =  req.query.car_id || req.params.car_id || req.car.car_id;
        const image_car = req.body.image_car || req.query.image_car || req.params.image_car || req.car.image_car;
        const car_type = req.body.car_type || req.query.car_type || req.params.car_type || req.car.car_type;
        const plug_type = req.body.plug_type || req.query.plug_type || req.params.plug_type || req.car.plug_type;
        const car_width = req.body.car_width || req.query.car_width || req.params.car_width || req.car.car_width;
        const car_length = req.body.car_length || req.query.car_length || req.params.car_length || req.car.car_length;
        const battery_capacity = req.body.battery_capacity || req.query.battery_capacity || req.params.battery_capacity || req.car.battery_capacity;
        pool.query(queries.updateCars, [car_id, image_car, car_type, plug_type, car_width, car_length, battery_capacity], (error, results)=>{
            if(error){
                throw error
            }
            else{
                res.status(CODE.SUCCESS).json({
                    CODE:CODE.SUCCESS,
                    MESSAGE:MESSAGE.SUCCESS,
                    Car: results.rows
                })
            }
        })
    },

    deleteCar: async (req, res, next)=>{
        const car_id =  req.query.car_id || req.params.car_id || req.car.car_id;
        pool.query(queries.deleteCar, [car_id], (error, results)=>{
            if(error){
                throw error
            }
            else{
                res.status(CODE.SUCCESS).json({
                    CODE: CODE.SUCCESS,
                    MESSAGE: MESSAGE.SUCCESS,
                    Message: `Car deleled with success with id ${car_id}`
                    
                })
            }
        })
    }



}

module.exports = car;
