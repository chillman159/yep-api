// QUERY FOR USER PRO
const insertUser = "INSERT INTO userpro(email,firstname,lastname,birth_date,statususer,password) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";
const finduserByEmail = "SELECT email, user_id, password from userpro WHERE email= $1";
const findUserById = "SELECT * FROM userpro WHERE user_id=$1";
const updateUserById = "UPDATE  userpro SET firstname =$2, lastname=$3, birth_date=$4, statususer =$5 WHERE user_id=$1 RETURNING *";

// QUERY FOR INSERT CAR OR CARS
const insertCar = "INSERT INTO car(user_id,image_car,car_type,plug_type,car_width,car_length,battery_capacity) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
const findCars = "SELECT * FROM car ORDER BY car_id ASC";
const findCarByID = "SELECT * FROM car WHERE car_id = $1";
const findCarByUserId = "SELECT * FROM car WHERE user_id = $1";
const updateCars = "UPDATE car SET image_car = $2, car_type =$3, plug_type =$4,car_width = $5, car_length = $6, battery_capacity= $7 WHERE car_id = $1 RETURNING *";
const deleteCar = "DELETE FROM car WHERE car_id=$1";


/**
 * QUERIES FOR FAVORIS
 */

const insertfavoris = "INSERT INTO favoris(user_id, chp_id) VALUES ($1,$2) RETURNING *";
const deletefavoris = "DELETE FROM favoris WHERE id_favoris = $1";


// QUERY FOR HISTORICAL

const insertHistorical = "INSERT INTO historical(user_id,chp_id,price,energy) VALUES($1,$2,$3,$4) RETURNING *";
const getAllHistorical = "SELECT * FROM  historical";

// QUERY FOR CHARGING POINT
const insertChp ="INSERT INTO chp (chp_address ,chp_longitude, chp_latitude, chp_status, chp_chargelevel, chp_parkinglength,chp_parkingheight, chp_parkingtype, chp_difficultyofaccess, chp_description, chp_user_id)VALUES ($1,$2,$3,$4,$5,$6,$7, $8,$9,$10,$11) RETURNING *";

const updateChp = "UPDATE chp SET chp_address=$2 WHERE chp_id = $1 RETURNING *";
const findChpById = "SELECT * FROM chp WHERE chp_id = $1"
const deleteChp = "DELETE FROM chp WHERE chp_id=$1"
const getRsvRequests = "SELECT * FROM reservation r , userpro u, chp c WHERE r.chp_id=$1 AND r.status=0 AND r.chp_id=c.chp_id AND c.chp_user_id=$2"
const getRsv = "SELECT * FROM reservation r , userpro u, chp c WHERE r.chp_id=$1 AND r.status=1 AND r.chp_id=c.chp_id AND c.chp_user_id=$2" // status = 1 pour dire que la demande de réservation est acceptée
const getRsvHistory = "SELECT * FROM reservation r , userpro u, chp c WHERE r.chp_id=$1 AND r.status=2 AND r.chp_id=c.chp_id AND c.chp_user_id=$2" // status = 2 pour dire que la réservation est consommée
const findChpByUser = "SELECT * FROM chp WHERE chp.chp_user_id=$1"


module.exports = { insertUser, finduserByEmail, findUserById, updateUserById, insertCar, findCars, updateCars, deleteCar, findCarByID, findCarByUserId, insertfavoris,deletefavoris, insertHistorical,getAllHistorical }


module.exports = {
    insertUser,
    finduserByEmail,
    findUserById,
    updateUserById,
    insertCar,
    findCars,
    updateCars,
    deleteCar,
    findCarByID,
    findCarByUserId,
//    -----------------
    insertChp,
    updateChp,
    findChpById,
    deleteChp,
    getRsvRequests,
    getRsv,
    getRsvHistory,
    findChpByUser
//    -----------------


}

