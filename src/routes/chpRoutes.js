const router = require("express").Router();
const { CODE, MESSAGE } = require("../../services/http/http_status");
const { body, validationResult, check } = require("express-validator");
const chpController = require("../Controllers/chpController");

router.post("/insertchp", chpController.insertChp);
router.put("/updatechp/:chp_id", chpController.updateChp);
router.get("/findbyid/:chp_id", chpController.findChpById);
router.get("/getuserchps", chpController.findChpByUser);
router.delete("/removechp", chpController.deleteChp);
module.exports = router;
