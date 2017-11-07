var express = require('express');
var router = express.Router();
var counterController = require('../controllers/counterController.js');

/*
 * GET
 */
router.get('/', counterController.list);

/*
 * GET
 */
router.get('/:id', counterController.show);

/*
 * POST
 */
router.post('/', counterController.create);

/*
 * PUT
 */
router.put('/:id', counterController.update);

/*
 * DELETE
 */
router.delete('/:id', counterController.remove);

module.exports = router;
