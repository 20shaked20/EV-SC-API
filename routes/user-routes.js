const express = require('express');
const {
    addUser,
    getUser,
    getAllUsers,
    AddFavorite,
    getFavoriteList,
    authUser,
    Logout,
    resetPass
} = require('../controllers/userController');

const router = express.Router();

router.post('/user', addUser);
router.get('/user/:id', getUser);
router.get('/users', getAllUsers);
router.post('/user/:id/favorite',AddFavorite);
router.get('/user/:id/favorites', getFavoriteList);
router.get('/user/auth/:email/:pass', authUser);
router.get('/user/logout', Logout);
router.get('/user/reset/:email', resetPass);


module.exports = {
    routes: router
}