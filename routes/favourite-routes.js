const express = require('express');
const {
    AddFavorite,
    getFavoriteList

} = require('../controllers/favouriteController');

const router = express.Router();

router.post('/favourite',AddFavorite);
router.get('/favourite', getFavoriteList);

module.exports = {
    routes: router
}