const {auth,db} = require('../db')

const addStation = async (req, res, next) =>{
    try {
        const data = req.body;
        console.log(req.body);
        const newStation = {
            Address: data.Address,
            AverageRating: data.AverageRating,
            ChargingStations: data.ChargingStations,
            Location: data.Location,
            Name: data.Name,
            SID: data.SID,
            SumOf_reviews: data.SumOf_reviews
        };
        await db.collection("stations")
            .doc(data.SID)
            .set(newStation);

    res.send("Station added succuessfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getStation = async (req, res, next) => {
    const sid = req.params.id.substring(1);
    console.log(sid);
    try {
        const stationData = await db 
        .collection("stations")
        .doc(sid)
        .get();

        console.log(stationData.data());
    res.send(stationData.data());
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getAllStations = async (req, res, next) => {
    try {
      const stations = [];
      const snapshot = await db.collection("stations").get();
      snapshot.forEach((doc) => {
        stations.push(doc.data());
      });
      res.send(stations);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

const updateStation = async (req, res, next) => {
    try {
        const sid = req.params.id.substring(1);
        console.log("Updating station: "+ req.params.id);
        const data = req.body;
        await db 
            .collection("stations")
            .doc(sid)
            .update({
                Address: data.Address,
                AverageRating: data.AverageRating,
                ChargingStations: data.ChargingStations,
                Location: data.Location,
                Name: data.Name,
                SID: data.SID,
                SumOf_reviews: data.SumOf_reviews
                
            })
            .then(() => {
                res.send("Station with ID of " + sid + "updated in database succuess");
            });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const AddReview = async (req, res, next) =>{
    const sid = req.params.id.substring(1);
    try{
        const data = req.body;
        await db.collection("stations")
        .doc(sid)
        .collection("reviews")
        .doc()
        .set(data)
        res.send("Review added successfully");
    }catch(err){
        res.status(400).send(err.message);
    }
}

const getReviewList = async (req, res, data) => {
    const sid = req.params.id.substring(1);
    let reviews = [];
    await db
    .collection("stations")
    .doc(sid)
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

const deleteStation = async (req, res, data) => {
    const sid = req.params.id.substring(1);
    console.log("Remove station -> "+ sid);
    try{
        const remove = await db
            .collection("stations")
            .doc(sid)
            .delete();

        res.send("Station with ID of " + sid + "removed from database ");

    } catch(err){
        res.status(400).send('error while trying to delete station');
    }

}

module.exports = {
    addStation,
    getStation,
    getAllStations,
    updateStation,
    AddReview,
    getReviewList,
    deleteStation
}