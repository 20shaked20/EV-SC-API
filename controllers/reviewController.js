"use strict";
const db = require('../db')

const AddReview = async (req, res, next) =>{
    try{
        const data = req.body;
        await db.collection("stations")
        .doc(data.stationID) //we send the stationID via the server!
        .collection("reviews")
        .set(data)
        res.send("Review added successfully");
    }catch(err){
        res.status(400).send(err.message);
    }
}

const getReviewList = async (req, res, data) => {
    let reviews = [];
    await db
    .collection("stations")
    .doc(data.stationID)
    .collection("reviews")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
            const rating = documentSnapshot.data().Stars;
            const uid = documentSnapshot.data().UID_user;
            const review = documentSnapshot.data().Review;

            reviews.push({ id:uid, value:rating, data:review });
        });
    })
    .catch((err) => {
        res.status(400).send('error while getting favorite stations: ${err.message}')
    });
    
    res.send(reviews);
}

module.exports = {
    AddReview,
    getReviewList
}