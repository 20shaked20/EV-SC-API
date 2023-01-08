const express = require('express');
const {
    addStation,
    getStation,
    updateStation,
    getAllStations,
    AddReview,
    getReviewList
} = require('../controllers/stationController');

const router = express.Router();

router.post('/station', addStation);
router.post('/station/:id', updateStation);
router.get('/station/:id', getStation);
router.get('/stations', getAllStations);
router.post('/station/:id/review',AddReview);
router.get('/station/:id/reviews', getReviewList);

module.exports = {
    routes: router
}