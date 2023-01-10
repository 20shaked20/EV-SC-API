const express = require('express');
const {
    addUser,
    getUser,
    getAllUsers,
    AddFavorite,
    getFavoriteList,
    authUser,
    Logout
} = require('../controllers/userController');

const router = express.Router();

router.post('/user', addUser);
router.get('/user/:id', getUser);
router.get('/users', getAllUsers);
router.post('/user/:id/favorite',AddFavorite);
router.get('/user/:id/favorites', getFavoriteList);
router.get('/user/auth/:email/:pass', authUser);
router.get('/user/logout', Logout);


module.exports = {
    routes: router
}