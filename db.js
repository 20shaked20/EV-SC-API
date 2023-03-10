const firebase = require('firebase');
const config = require('./config');
const auth = firebase.initializeApp(config.firebaseConfig).auth();
const db = firebase.firestore();
const storage = firebase.storage();

module.exports = { auth, db, storage };