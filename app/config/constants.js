import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAaqThRTv3mr83thnI-mN3xSfD2mWgDUhY",
  authDomain: "chatapp-acc25.firebaseapp.com",
  databaseURL: "https://chatapp-acc25.firebaseio.com",
  storageBucket: "chatapp-acc25.appspot.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const decisionsExpirationLength = 50000
