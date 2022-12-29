"use strict";
const db = require('../db')

const AddFavorite = async (req, res, next) =>{
    try{
        const data = req.body;
        await db.collection("users")
        .doc(data.userID)
        .collection("favorites")
        .set(data)
        res.send("Favorite station added successfully");
    }catch(err){
        res.status(400).send(err.message);
    }
}

const getFavoriteList = async (req, res, data) => {
    let favorites = [];
    await db
    .collection("users")
    .doc(data.userID)
    .collection("favorites")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
            const name = documentSnapshot.data().Station;
            const sid = documentSnapshot.data().SID;
            const location = documentSnapshot.data().Location;

            favorites.push({ label:name, value:sid, loc:location });
        });
    })
    .catch((err) => {
        res.status(400).send('error while getting favorite stations: ${err.message}')
    });
    
    res.send(favorites);
}

module.exports = {
    AddFavorite,
    getFavoriteList
}