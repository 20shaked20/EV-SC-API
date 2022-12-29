"use strict";
const express = require('express');
const {
    AddReview,
    getReviewList
} = require('../controllers/reviewController');

const router = express.Router();

router.post('/review',AddReview);
router.get('/review', getReviewList);

module.exports = {
    routes: router
}