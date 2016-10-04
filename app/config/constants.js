const firebase  = require('firebase')
require('firebase/auth')
require('firebase/database')

const config = {
  apiKey: "AIzaSyAaqThRTv3mr83thnI-mN3xSfD2mWgDUhY",
  authDomain: "chatapp-acc25.firebaseapp.com",
  databaseURL: "https://chatapp-acc25.firebaseio.com",
  storageBucket: "chatapp-acc25.appspot.com",
}

// firebase.initializeApp({
//     serviceAccount: __dirname + "/ChatApp.json",
//     databaseURL: "https://chatapp-acc25.firebaseio.com/"
// });

firebase.initializeApp(config)

const ref = firebase.database().ref()
const firebaseAuth = firebase.auth
const storageRef = firebase.storage().ref()


const decisionsExpirationLength = 50000

module.exports = { ref, firebaseAuth, decisionsExpirationLength, firebase, storageRef }
