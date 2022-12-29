const express = require('express');
const {
    addStation,
    getStation,
    updateStation
} = require('../controllers/stationController');

const router = express.Router();

router.post('/station', addStation);
router.post('/station/:id', updateStation);
router.get('/station/:id', getStation);

module.exports = {
    routes: router
}