import { ref, storageRef, firebaseAuth } from '../config/constants'

export default function auth () {
    return firebaseAuth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
}

export function checkIfAuthed (store) {
  return store.getState().users.isAuthed === true
}

export function logout () {
    return firebaseAuth().signOut()
}

// export function saveUser (user) {
//     user.banned = false;
//     user.type = 'normal';
//     return ref.child(`users/${user.uid}/info`)
//         .set(user)
//         .then(() => user)
// }

export function createFirebaseUser(email, password) {
    return firebaseAuth().createUserWithEmailAndPassword(email, password)
}

export function saveUserToDatabase (id, user) {
    user.banned = false
    user.type = 'normal'
    user.uid = id
    return ref.child(`users/${id}/info`)
        .set({...user})
}

export function signInUser ( signIn ) {
    return firebase.auth().signInWithEmailAndPassword(signIn.email, signIn.password).catch(function(error) {
        return error.message
    })
}

export function signInAnonymous () {
    // return firebaseAuth().signInAnonymously().catch((error) => {
    //     return error.message;
    // })

    let email = 'anonymous@anonymous.com';
    let password = 'anonymous'

    return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        return error.message
    });
}
