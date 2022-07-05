const router = require("express").Router();
const { CODE, MESSAGE } = require('../../services/http/http_status');
const { body, validationResult, check } = require("express-validator");
const rsvController = require('../Controllers/rsvController');

router.get("/rsvrequests", rsvController.rsvRequests);
router.get("/reservations", rsvController.getRsv);
router.get("/history", rsvController.getRsvHistory);
// router.put("/updatechp/:chp_id", chpController.updateChp);
// router.get("/findbyid:id", chpController.findChpById);
// router.delete("/removechp", chpController.deleteChp);
module.exports = router;