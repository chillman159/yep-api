const router = require("express").Router();
const HistoricalController = require('../Controllers/historicalController');
const { CODE, MESSAGE } = require('../../services/http/http_status');

/**
 * INSERT HISTORIQUE
 */
 router.post("/insert", HistoricalController.inserthistorical);

 /**
  * GET ALL HISTORIQUE
  */

 router.get("/getAllHistorique", HistoricalController.getAllHistorical);

 module.exports = router;