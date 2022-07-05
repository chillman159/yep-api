const router = require("express").Router();
const favorisController = require('../Controllers/favorisController');
const { CODE, MESSAGE } = require('../../services/http/http_status');

/**
 * INSERT FAVORIS
 */
router.post("/insert", favorisController.insertfavoris);

/**
 * DELETE FAVORIS
 */

router.delete("/delete/:id_favoris", favorisController.deletefavoris);



module.exports = router;