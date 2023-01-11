const express = require('express');
const {
    addStation,
    getStation,
    updateStation,
    getAllStations,
    AddReview,
    getReviewList,
    deleteStation
} = require('../controllers/stationController');

const router = express.Router();

router.post('/station', addStation);
router.post('/station/update/:id', updateStation);
router.get('/station/:id', getStation);
router.get('/stations', getAllStations);
router.post('/station/:id/review',AddReview);
router.get('/station/:id/reviews', getReviewList);
router.post('/station/delete/:id', deleteStation);

module.exports = {
    routes: router
}