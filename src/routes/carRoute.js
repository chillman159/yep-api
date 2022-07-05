const router = require("express").Router();
const { CODE, MESSAGE } = require('../../services/http/http_status');
const { body, validationResult, check } = require("express-validator");
const carController = require('../Controllers/carController');
//Insert car
router.post("/InsertCar", carController.insertCar);

//FIND ALL CARS
router.get("/findAllCars", carController.findAllCars);

//  FIND CAR BY ID

router.get("/findCarById/:car_id", carController.findCarById);

// FIND CAR BY USER ID
router.get("/findCarByUser/:user_id", carController.findCarByUserId);

// Update Car

router.put("/updateCar/:car_id", carController.UpdateCars);

// DELETE A CAR

router.delete("/deleteCar/:car_id", carController.deleteCar);

module.exports = router;