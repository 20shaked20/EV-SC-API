const express = require('express');
const {
    addUser,
    getUser,
    getAllUsers,
    AddFavorite,
    getFavoriteList
} = require('../controllers/userController');

const router = express.Router();

router.post('/user', addUser);
router.get('/user/:id', getUser);
router.get('/users', getAllUsers);
router.post('/user/:id/favorite',AddFavorite);
router.get('/user/:id/favorites', getFavoriteList);


module.exports = {
    routes: router
}