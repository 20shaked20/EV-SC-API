const { auth, db, storage } = require('../db')

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(req.body);
        const authResponse = await auth.createUserWithEmailAndPassword(data.email, data.pass);
        if (authResponse != null) {
            const uid = auth.currentUser.uid;
            const newUser = {
                FirstName: data.FirstName,
                LastName: data.LastName,
                Permission: data.Permission,
                Phone: data.Phone,
                UID: uid,
                UserName: data.UserName
            };
            await db.collection("users")
                .doc(uid)
                .set(newUser);
        }


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

const getAllUsers = async (req, res, next) => {
    try {
        const users = [];
        const snapshot = await db.collection("users").get();
        snapshot.forEach((doc) => {
            users.push(doc.data());
        });
        res.send(users);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const AddFavorite = async (req, res, next) => {
    const uid = req.params.id.substring(1);
    console.log(uid)
    try {
        const data = req.body;
        await db.collection("users")
            .doc(uid)
            .collection("favorites")
            .doc()
            .set(data)
        res.send("Favorite station added successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getFavoriteList = async (req, res, data) => {
    const uid = req.params.id.substring(1);
    let favorites = [];
    await db
        .collection("users")
        .doc(uid)
        .collection("favorites")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
                const name = documentSnapshot.data().Station;
                const sid = documentSnapshot.data().SID;
                const location = documentSnapshot.data().Location;

                favorites.push({ Location: location, SID: sid, Station: name });
            });
        })
        .catch((err) => {
            res.status(400).send(err.message)
        });

    res.send(favorites);
}

const authUser = async (req, res, next) => {
    const u_email = req.params.email.substring(1);
    const u_pass = req.params.pass.substring(1);
    try {
        const user = await auth.signInWithEmailAndPassword(u_email, u_pass);
        const userData = await db
            .collection("users")
            .doc(user.user.uid)
            .get();

        console.log(userData.data());
        res.send(userData.data());

    } catch (error) {
        console.error(error);
        res.send(error);
    }
}

const Logout = async (req, res, next) => {
    try {
        await auth.signOut();
        res.send("User Signed Out Successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

const resetPass = async (req, res, next) => {
    const u_email = req.params.email.substring(1);
    try{
        await auth.sendPasswordResetEmail(u_email);
        console.log("Sending email password reset for email: " + u_email);
        res.status(200).send("Password reset sent to email");
    }catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

// const uploadProfileIMG = async (req, res, next) => {
//     try{
//         const fileRef = storage.ref("users/" + auth.uid + "profile_pic.png");
//         const imageBuffer = Buffer.from(req.body.image, "base64");

//         await fileRef.put(imageBuffer);
//         res.send("Image added successfully to database storage");
//     }catch (error) {
//         console.error(error);
//         res.status(500).send(error);
//     }
// }

module.exports = {
    addUser,
    getUser,
    getAllUsers,
    AddFavorite,
    getFavoriteList,
    authUser,
    Logout,
    resetPass
    // uploadProfileIMG
}
