webpackHotUpdate(0,{

/***/ 296:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var firebase = __webpack_require__(297);
	__webpack_require__(299);
	__webpack_require__(300);

	// const config = {
	//   apiKey: "AIzaSyAaqThRTv3mr83thnI-mN3xSfD2mWgDUhY",
	//   authDomain: "chatapp-acc25.firebaseapp.com",
	//   databaseURL: "https://chatapp-acc25.firebaseio.com",
	//   storageBucket: "chatapp-acc25.appspot.com",
	// }

	firebase.initializeApp({
	    serviceAccount: __dirname + "/ChatApp.json",
	    databaseURL: "https://chatapp-acc25.firebaseio.com/"
	});

	// firebase.initializeApp(config)

	var ref = firebase.database().ref();
	var firebaseAuth = firebase.auth;
	// const storageRef = firebase.storage().ref()


	var decisionsExpirationLength = 50000;

	module.exports = { ref: ref, firebaseAuth: firebaseAuth, decisionsExpirationLength: decisionsExpirationLength };
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC40MDAzNzA4Nzk0NmZiMzhiNDgxNi5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2FwcC9jb25maWcvY29uc3RhbnRzLmpzP2E5N2UiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZmlyZWJhc2UgID0gcmVxdWlyZSgnZmlyZWJhc2UnKVxucmVxdWlyZSgnZmlyZWJhc2UvYXV0aCcpXG5yZXF1aXJlKCdmaXJlYmFzZS9kYXRhYmFzZScpXG5cbi8vIGNvbnN0IGNvbmZpZyA9IHtcbi8vICAgYXBpS2V5OiBcIkFJemFTeUFhcVRoUlR2M21yODN0aG5JLW1OM3hTZkQybVdnRFVoWVwiLFxuLy8gICBhdXRoRG9tYWluOiBcImNoYXRhcHAtYWNjMjUuZmlyZWJhc2VhcHAuY29tXCIsXG4vLyAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vY2hhdGFwcC1hY2MyNS5maXJlYmFzZWlvLmNvbVwiLFxuLy8gICBzdG9yYWdlQnVja2V0OiBcImNoYXRhcHAtYWNjMjUuYXBwc3BvdC5jb21cIixcbi8vIH1cblxuZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcCh7XG4gICAgc2VydmljZUFjY291bnQ6IF9fZGlybmFtZSArIFwiL0NoYXRBcHAuanNvblwiLFxuICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vY2hhdGFwcC1hY2MyNS5maXJlYmFzZWlvLmNvbS9cIlxufSk7XG5cbi8vIGZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKVxuXG5jb25zdCByZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigpXG5jb25zdCBmaXJlYmFzZUF1dGggPSBmaXJlYmFzZS5hdXRoXG4vLyBjb25zdCBzdG9yYWdlUmVmID0gZmlyZWJhc2Uuc3RvcmFnZSgpLnJlZigpXG5cblxuY29uc3QgZGVjaXNpb25zRXhwaXJhdGlvbkxlbmd0aCA9IDUwMDAwXG5cbm1vZHVsZS5leHBvcnRzID0geyByZWYsIGZpcmViYXNlQXV0aCwgZGVjaXNpb25zRXhwaXJhdGlvbkxlbmd0aCB9XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29uZmlnL2NvbnN0YW50cy5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Iiwic291cmNlUm9vdCI6IiJ9