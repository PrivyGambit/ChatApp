webpackHotUpdate(0,{

/***/ 428:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // import { ref, firebaseAuth } from '../config/constants'


	exports.default = auth;
	exports.checkIfAuthed = checkIfAuthed;
	exports.logout = logout;
	exports.createFirebaseUser = createFirebaseUser;
	exports.saveUserToDatabase = saveUserToDatabase;
	exports.signInUser = signInUser;
	exports.signInAnonymous = signInAnonymous;

	var _constants = __webpack_require__(296);

	function auth() {
	    return (0, _constants.firebaseAuth)().signInWithPopup(new firebase.auth.FacebookAuthProvider());
	}

	function checkIfAuthed(store) {
	    return store.getState().users.isAuthed === true;
	}

	function logout() {
	    return (0, _constants.firebaseAuth)().signOut();
	}

	// export function saveUser (user) {
	//     user.banned = false;
	//     user.type = 'normal';
	//     return ref.child(`users/${user.uid}/info`)
	//         .set(user)
	//         .then(() => user)
	// }

	function createFirebaseUser(email, password) {
	    return (0, _constants.firebaseAuth)().createUserWithEmailAndPassword(email, password);
	}

	function saveUserToDatabase(id, user) {
	    user.banned = false;
	    user.type = 'normal';
	    user.uid = id;
	    return _constants.ref.child('users/' + id + '/info').set(_extends({}, user));
	}

	function signInUser(signIn) {
	    return firebase.auth().signInWithEmailAndPassword(signIn.email, signIn.password).catch(function (error) {
	        return error.message;
	    });
	}

	function signInAnonymous() {
	    // return firebaseAuth().signInAnonymously().catch((error) => {
	    //     return error.message;
	    // })

	    var email = 'anonymous@anonymous.com';
	    var password = 'anonymous';

	    return firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
	        return error.message;
	    });
	}

/***/ }

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5hMzYwMDgyZDZkNDIzY2RiNWQwYS5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2FwcC9oZWxwZXJzL2F1dGguanM/MWYwMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyByZWYsIGZpcmViYXNlQXV0aCB9IGZyb20gJy4uL2NvbmZpZy9jb25zdGFudHMnXG5pbXBvcnQgeyByZWYsIHN0b3JhZ2VSZWYsIGZpcmViYXNlQXV0aCB9IGZyb20gJy4uL2NvbmZpZy9jb25zdGFudHMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGF1dGggKCkge1xuICAgIHJldHVybiBmaXJlYmFzZUF1dGgoKS5zaWduSW5XaXRoUG9wdXAobmV3IGZpcmViYXNlLmF1dGguRmFjZWJvb2tBdXRoUHJvdmlkZXIoKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrSWZBdXRoZWQgKHN0b3JlKSB7XG4gIHJldHVybiBzdG9yZS5nZXRTdGF0ZSgpLnVzZXJzLmlzQXV0aGVkID09PSB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXQgKCkge1xuICAgIHJldHVybiBmaXJlYmFzZUF1dGgoKS5zaWduT3V0KClcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHNhdmVVc2VyICh1c2VyKSB7XG4vLyAgICAgdXNlci5iYW5uZWQgPSBmYWxzZTtcbi8vICAgICB1c2VyLnR5cGUgPSAnbm9ybWFsJztcbi8vICAgICByZXR1cm4gcmVmLmNoaWxkKGB1c2Vycy8ke3VzZXIudWlkfS9pbmZvYClcbi8vICAgICAgICAgLnNldCh1c2VyKVxuLy8gICAgICAgICAudGhlbigoKSA9PiB1c2VyKVxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmlyZWJhc2VVc2VyKGVtYWlsLCBwYXNzd29yZCkge1xuICAgIHJldHVybiBmaXJlYmFzZUF1dGgoKS5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3N3b3JkKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVVzZXJUb0RhdGFiYXNlIChpZCwgdXNlcikge1xuICAgIHVzZXIuYmFubmVkID0gZmFsc2VcbiAgICB1c2VyLnR5cGUgPSAnbm9ybWFsJ1xuICAgIHVzZXIudWlkID0gaWRcbiAgICByZXR1cm4gcmVmLmNoaWxkKGB1c2Vycy8ke2lkfS9pbmZvYClcbiAgICAgICAgLnNldCh7Li4udXNlcn0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaWduSW5Vc2VyICggc2lnbkluICkge1xuICAgIHJldHVybiBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoc2lnbkluLmVtYWlsLCBzaWduSW4ucGFzc3dvcmQpLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvci5tZXNzYWdlXG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNpZ25JbkFub255bW91cyAoKSB7XG4gICAgLy8gcmV0dXJuIGZpcmViYXNlQXV0aCgpLnNpZ25JbkFub255bW91c2x5KCkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgLy8gICAgIHJldHVybiBlcnJvci5tZXNzYWdlO1xuICAgIC8vIH0pXG5cbiAgICBsZXQgZW1haWwgPSAnYW5vbnltb3VzQGFub255bW91cy5jb20nO1xuICAgIGxldCBwYXNzd29yZCA9ICdhbm9ueW1vdXMnXG5cbiAgICByZXR1cm4gZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzd29yZCkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yLm1lc3NhZ2VcbiAgICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9oZWxwZXJzL2F1dGguanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUlBO0FBWUE7QUFJQTtBQVFBO0FBTUE7QUFDQTtBQXpDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzsiLCJzb3VyY2VSb290IjoiIn0=