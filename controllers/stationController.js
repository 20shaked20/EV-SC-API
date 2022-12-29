const db = require('../db')

const addStation = async (req, res, next) =>{
    try {
        const data = req.body;
        await db.collection("stations")
        .doc(data.SID)
        .set(data);

    res.send("Station added succuessfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getStation = async (req, res, next) => {
    const sid = req.params.id 
    try {
        const userData = await db 
        .collection("users")
        .doc(sid)
        .get();

    res.send(userData.data());
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const updateStation = async (req, res, next) => {
    try {
        const sid = req.params.id;
        const data = req.body;
        await db 
            .collection("stations")
            .doc(sid)
            .update({
                station_name : data.station_name,
                avg_grade : data.avg_grade,
                station_address: data.station_address,
                location: data.location,
                charghing_stations: data.charghing_stations,
                sumOf_reviews: data.sumOf_reviews
                // SID is not updated as we don't expect it to change
            })
            .then(() => {
                res.send("Station with ID of " + sid + "updated in database succuess");
            });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    addStation,
    getStation,
    updateStation
}