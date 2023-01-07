const db = require('../db')

const addUser = async (req, res, next) =>{
    try {
        const data = req.body;
        await db.collection("users")
        .doc(data.UID)
        .set(data);

    res.send("User added succuessfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getUser = async (req, res, next) => {
    const uid = req.params.id.substring(1);
    try {
        const userData = await db 
        .collection("users")
        .doc(uid)
        .get();

    res.send(userData.data());
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    addUser,
    getUser
}
