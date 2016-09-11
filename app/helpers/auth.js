import { ref, firebaseAuth } from 'config/constants'

export default function auth () {
    return firebaseAuth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
}

export function checkIfAuthed (store) {
  return store.getState().users.isAuthed === true
}

export function logout () {
    return firebaseAuth().signOut()
}

export function saveUser (user) {
    return ref.child(`users/${user.uid}/info`)
        .set(user)
        .then(() => user)
}

export function createFirebaseUser(email, password) {
    return firebaseAuth().createUserWithEmailAndPassword(email, password)
}

export function saveUserToDatabase (user) {
    const userId = ref.child('users').push().key
    return ref.child(`users/${userId}/info`).set({...user, userId})
}

export function signInAnonymous () {
    // return firebaseAuth().signInAnonymously().catch((error) => {
    //     return error.message;
    // })

    let email = 'test@gmail.com';
    let password = 'testpassword'

    return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        return error.message
    });
}
