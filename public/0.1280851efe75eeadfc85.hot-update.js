webpackHotUpdate(0,{

/***/ 429:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.saveRoom = saveRoom;
	exports.saveChat = saveChat;
	exports.banUser = banUser;
	exports.unBanUser = unBanUser;
	exports.deleteChat = deleteChat;
	exports.listenToRooms = listenToRooms;
	exports.turnOffListener = turnOffListener;
	exports.listenToChats = listenToChats;
	exports.fetchRooms = fetchRooms;
	exports.fetchRooms = fetchRooms;
	exports.fetchUser = fetchUser;
	exports.listenToUsersList = listenToUsersList;
	exports.uploadFile = uploadFile;

	var _constants = __webpack_require__(296);

	var _auth = __webpack_require__(428);

	function saveRoom(room) {
	    var roomId = _constants.ref.child('rooms').push().key;
	    return _constants.ref.child('rooms/' + roomId).set(_extends({}, room, { roomId: roomId }));
	}

	function saveChat(chat, roomId, quote) {
	    _constants.ref.child('rooms/' + roomId).update({
	        latestUpdateTime: chat.timestamp
	    });
	    _constants.ref.child('rooms/' + roomId + '/newContent').update({
	        chat: chat.content,
	        user: chat.user
	    });
	    var chatId = _constants.ref.child('rooms/' + roomId + '/chats').push().key;
	    return _constants.ref.child('rooms/' + roomId + '/chats/' + chatId).update({
	        type: chat.type,
	        content: chat.content,
	        timestamp: chat.timestamp,
	        user: {
	            name: chat.user,
	            avatar: chat.avatar
	        },
	        chatId: chatId,
	        quote: quote,
	        announcement: chat.announcement
	    });
	}

	function banUser(userId) {
	    return _constants.ref.child('users/' + userId + '/info').update({
	        banned: true
	    });
	}

	function unBanUser(userId) {
	    return _constants.ref.child('users/' + userId + '/info').update({
	        banned: false
	    });
	}

	function deleteChat(roomId, chatId) {
	    return _constants.ref.child('rooms/' + roomId + '/chats/' + chatId).remove();
	}

	function listenToRooms(cb, error) {
	    //check if user is logged or not
	    (0, _constants.firebaseAuth)().onAuthStateChanged(function (user) {
	        if (!user) {
	            (0, _auth.signInAnonymous)(); //sign in as anonymous
	        }
	    });

	    return _constants.ref.child('rooms').on('value', function (snapshot) {
	        return cb(snapshot.val() || {});
	    }, error);
	}

	function turnOffListener(roomId) {
	    return _constants.ref.child('rooms/' + roomId + '/chats').off();
	}

	function listenToChats(roomId, cb, error) {
	    return _constants.ref.child('rooms/' + roomId + '/chats').on('value', function (snapshot) {
	        return cb(snapshot.val() || {});
	    }, error);
	}

	function fetchRooms() {
	    return _constants.ref.child('rooms/').then(function (snapshot) {
	        return snapshot.val() || {};
	    }).catch(function (err) {
	        return console.warn('Error fetching rooms', err);
	    });
	}

	function fetchRooms() {
	    return _constants.ref.child('rooms/').then(function (snapshot) {
	        return snapshot.val() || {};
	    }).catch(function (err) {
	        return console.warn('Error fetching rooms', err);
	    });
	}

	function fetchUser(uid) {
	    return _constants.ref.child('users/' + uid).once('value').then(function (snapshot) {
	        return snapshot.val() || {};
	    }).catch(function (err) {
	        return console.warn('Error fetching the user', err);
	    });
	}

	function listenToUsersList(cb, error) {
	    return _constants.ref.child('users').on('value', function (snapshot) {
	        return cb(snapshot.val() || {});
	    }, error);
	}

	function uploadFile(file, chat, roomId, quote) {
	    var metadata = {
	        contentType: 'image/jpeg'
	    };

	    // Upload file and metadata to the object 'images/mountains.jpg'
	    var uploadTask = _constants.storageRef.child('images/' + file.name).put(file, metadata);

	    // Listen for state changes, errors, and completion of the upload.
	    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
	    function (snapshot) {
	        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
	        var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
	        console.log('Upload is ' + progress + '% done');
	        switch (snapshot.state) {
	            case firebase.storage.TaskState.PAUSED:
	                // or 'paused'
	                console.log('Upload is paused');
	                break;
	            case firebase.storage.TaskState.RUNNING:
	                // or 'running'
	                console.log('Upload is running');
	                break;
	        }
	    }, function (error) {
	        switch (error.code) {
	            case 'storage/unauthorized':
	                // User doesn't have permission to access the object
	                return false;
	                break;

	            case 'storage/canceled':
	                // User canceled the upload
	                return false;
	                break;

	            case 'storage/unknown':
	                // Unknown error occurred, inspect error.serverResponse
	                return false;
	                break;
	        }
	    }, function () {
	        // Upload completed successfully, now we can get the download URL
	        var downloadURL = uploadTask.snapshot.downloadURL;
	        var chatId = _constants.ref.child('rooms/' + roomId + '/chats').push().key;
	        return _constants.ref.child('rooms/' + roomId + '/chats').push({
	            type: chat.type,
	            user: {
	                name: chat.user,
	                avatar: chat.avatar
	            },
	            timestamp: chat.timestamp,
	            url: downloadURL,
	            chatId: chatId,
	            quote: quote
	        });
	    });
	}

/***/ }

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC4xMjgwODUxZWZlNzVlZWFkZmM4NS5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2FwcC9oZWxwZXJzL2FwaS5qcz8yNTJiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZiwgc3RvcmFnZVJlZiwgZmlyZWJhc2VBdXRoIH0gZnJvbSAnLi4vY29uZmlnL2NvbnN0YW50cydcbmltcG9ydCB7IHNpZ25JbkFub255bW91cywgY2hlY2tJZlNpZ25lZCB9IGZyb20gJy4vYXV0aCdcblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVSb29tIChyb29tKSB7XG4gICAgY29uc3Qgcm9vbUlkID0gcmVmLmNoaWxkKCdyb29tcycpLnB1c2goKS5rZXlcbiAgICByZXR1cm4gcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH1gKS5zZXQoey4uLnJvb20sIHJvb21JZH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlQ2hhdCAoIGNoYXQsIHJvb21JZCwgcXVvdGUgKSB7XG4gICAgcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH1gKS51cGRhdGUoe1xuICAgICAgICBsYXRlc3RVcGRhdGVUaW1lOiBjaGF0LnRpbWVzdGFtcFxuICAgIH0pXG4gICAgcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH0vbmV3Q29udGVudGApLnVwZGF0ZSh7XG4gICAgICAgIGNoYXQ6IGNoYXQuY29udGVudCxcbiAgICAgICAgdXNlcjogY2hhdC51c2VyXG4gICAgfSlcbiAgICBjb25zdCBjaGF0SWQgPSByZWYuY2hpbGQoYHJvb21zLyR7cm9vbUlkfS9jaGF0c2ApLnB1c2goKS5rZXlcbiAgICByZXR1cm4gcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH0vY2hhdHMvJHsgY2hhdElkIH1gKS51cGRhdGUoe1xuICAgICAgICB0eXBlOiBjaGF0LnR5cGUsXG4gICAgICAgIGNvbnRlbnQ6IGNoYXQuY29udGVudCxcbiAgICAgICAgdGltZXN0YW1wOiBjaGF0LnRpbWVzdGFtcCxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgbmFtZTogY2hhdC51c2VyLFxuICAgICAgICAgICAgYXZhdGFyOiBjaGF0LmF2YXRhclxuICAgICAgICB9LFxuICAgICAgICBjaGF0SWQ6IGNoYXRJZCxcbiAgICAgICAgcXVvdGU6IHF1b3RlLFxuICAgICAgICBhbm5vdW5jZW1lbnQ6IGNoYXQuYW5ub3VuY2VtZW50XG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhblVzZXIgKHVzZXJJZCkge1xuICAgIHJldHVybiByZWYuY2hpbGQoYHVzZXJzLyR7dXNlcklkfS9pbmZvYCkudXBkYXRlKHtcbiAgICAgICAgYmFubmVkOiB0cnVlXG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuQmFuVXNlciAodXNlcklkKSB7XG4gICAgcmV0dXJuIHJlZi5jaGlsZChgdXNlcnMvJHt1c2VySWR9L2luZm9gKS51cGRhdGUoe1xuICAgICAgICBiYW5uZWQ6IGZhbHNlXG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUNoYXQgKCByb29tSWQsIGNoYXRJZCApIHtcbiAgICByZXR1cm4gcmVmLmNoaWxkKGByb29tcy8keyByb29tSWQgfS9jaGF0cy8keyBjaGF0SWQgfWApLnJlbW92ZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5Ub1Jvb21zIChjYiwgZXJyb3IpIHtcbiAgICAvL2NoZWNrIGlmIHVzZXIgaXMgbG9nZ2VkIG9yIG5vdFxuICAgIGZpcmViYXNlQXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZCgodXNlcikgPT4ge1xuICAgICAgICBpZiAoICF1c2VyICkge1xuICAgICAgICAgICAgc2lnbkluQW5vbnltb3VzKCkgLy9zaWduIGluIGFzIGFub255bW91c1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiByZWYuY2hpbGQoJ3Jvb21zJykub24oJ3ZhbHVlJywgKHNuYXBzaG90KSA9PiB7XG4gICAgICAgIHJldHVybiBjYihzbmFwc2hvdC52YWwoKSB8fCB7fSlcbiAgICB9LCBlcnJvcilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHR1cm5PZmZMaXN0ZW5lciAocm9vbUlkKSB7XG4gICAgcmV0dXJuIHJlZi5jaGlsZChgcm9vbXMvJHtyb29tSWR9L2NoYXRzYCkub2ZmKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5Ub0NoYXRzIChyb29tSWQsIGNiLCBlcnJvcikge1xuICAgIHJldHVybiByZWYuY2hpbGQoYHJvb21zLyR7cm9vbUlkfS9jaGF0c2ApLm9uKCd2YWx1ZScsIChzbmFwc2hvdCkgPT4ge1xuICAgICAgICByZXR1cm4gY2Ioc25hcHNob3QudmFsKCkgfHwge30pXG4gICAgfSwgZXJyb3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFJvb21zICgpIHtcbiAgICByZXR1cm4gcmVmLmNoaWxkKCdyb29tcy8nKVxuICAgICAgICAudGhlbigoc25hcHNob3QpID0+IHNuYXBzaG90LnZhbCgpIHx8IHt9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS53YXJuKCdFcnJvciBmZXRjaGluZyByb29tcycsIGVycikpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFJvb21zICgpIHtcbiAgICByZXR1cm4gcmVmLmNoaWxkKCdyb29tcy8nKVxuICAgICAgICAudGhlbigoc25hcHNob3QpID0+IHNuYXBzaG90LnZhbCgpIHx8IHt9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS53YXJuKCdFcnJvciBmZXRjaGluZyByb29tcycsIGVycikpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFVzZXIgKHVpZCkge1xuICAgIHJldHVybiByZWYuY2hpbGQoYHVzZXJzLyR7dWlkfWApLm9uY2UoJ3ZhbHVlJylcbiAgICAgICAgLnRoZW4oKHNuYXBzaG90KSA9PiBzbmFwc2hvdC52YWwoKSB8fCB7fSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUud2FybignRXJyb3IgZmV0Y2hpbmcgdGhlIHVzZXInLCBlcnIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlzdGVuVG9Vc2Vyc0xpc3QgKGNiLCBlcnJvcikge1xuICAgIHJldHVybiByZWYuY2hpbGQoJ3VzZXJzJykub24oJ3ZhbHVlJywgKHNuYXBzaG90KSA9PiB7XG4gICAgICAgIHJldHVybiBjYihzbmFwc2hvdC52YWwoKSB8fCB7fSlcbiAgICB9LCBlcnJvcilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwbG9hZEZpbGUgKCBmaWxlLCBjaGF0LCByb29tSWQsIHF1b3RlICkge1xuICAgIGxldCBtZXRhZGF0YSA9IHtcbiAgICAgICAgY29udGVudFR5cGU6ICdpbWFnZS9qcGVnJ1xuICAgIH07XG5cbiAgICAvLyBVcGxvYWQgZmlsZSBhbmQgbWV0YWRhdGEgdG8gdGhlIG9iamVjdCAnaW1hZ2VzL21vdW50YWlucy5qcGcnXG4gICAgbGV0IHVwbG9hZFRhc2sgPSBzdG9yYWdlUmVmLmNoaWxkKCdpbWFnZXMvJyArIGZpbGUubmFtZSkucHV0KGZpbGUsIG1ldGFkYXRhKTtcblxuICAgIC8vIExpc3RlbiBmb3Igc3RhdGUgY2hhbmdlcywgZXJyb3JzLCBhbmQgY29tcGxldGlvbiBvZiB0aGUgdXBsb2FkLlxuICAgIHVwbG9hZFRhc2sub24oZmlyZWJhc2Uuc3RvcmFnZS5UYXNrRXZlbnQuU1RBVEVfQ0hBTkdFRCwgLy8gb3IgJ3N0YXRlX2NoYW5nZWQnXG4gICAgICAgIGZ1bmN0aW9uKCBzbmFwc2hvdCApIHtcbiAgICAgICAgICAgIC8vIEdldCB0YXNrIHByb2dyZXNzLCBpbmNsdWRpbmcgdGhlIG51bWJlciBvZiBieXRlcyB1cGxvYWRlZCBhbmQgdGhlIHRvdGFsIG51bWJlciBvZiBieXRlcyB0byBiZSB1cGxvYWRlZFxuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gKHNuYXBzaG90LmJ5dGVzVHJhbnNmZXJyZWQgLyBzbmFwc2hvdC50b3RhbEJ5dGVzKSAqIDEwMDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVcGxvYWQgaXMgJyArIHByb2dyZXNzICsgJyUgZG9uZScpO1xuICAgICAgICAgICAgc3dpdGNoIChzbmFwc2hvdC5zdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgZmlyZWJhc2Uuc3RvcmFnZS5UYXNrU3RhdGUuUEFVU0VEOiAvLyBvciAncGF1c2VkJ1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVXBsb2FkIGlzIHBhdXNlZCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZmlyZWJhc2Uuc3RvcmFnZS5UYXNrU3RhdGUuUlVOTklORzogLy8gb3IgJ3J1bm5pbmcnXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVcGxvYWQgaXMgcnVubmluZycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgc3dpdGNoIChlcnJvci5jb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RvcmFnZS91bmF1dGhvcml6ZWQnOlxuICAgICAgICAgICAgICAgICAgICAvLyBVc2VyIGRvZXNuJ3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGFjY2VzcyB0aGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0b3JhZ2UvY2FuY2VsZWQnOlxuICAgICAgICAgICAgICAgICAgICAvLyBVc2VyIGNhbmNlbGVkIHRoZSB1cGxvYWRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnc3RvcmFnZS91bmtub3duJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5rbm93biBlcnJvciBvY2N1cnJlZCwgaW5zcGVjdCBlcnJvci5zZXJ2ZXJSZXNwb25zZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gVXBsb2FkIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHksIG5vdyB3ZSBjYW4gZ2V0IHRoZSBkb3dubG9hZCBVUkxcbiAgICAgICAgICAgIGxldCBkb3dubG9hZFVSTCA9IHVwbG9hZFRhc2suc25hcHNob3QuZG93bmxvYWRVUkw7XG4gICAgICAgICAgICBjb25zdCBjaGF0SWQgPSByZWYuY2hpbGQoYHJvb21zLyR7cm9vbUlkfS9jaGF0c2ApLnB1c2goKS5rZXlcbiAgICAgICAgICAgIHJldHVybiByZWYuY2hpbGQoYHJvb21zLyR7cm9vbUlkfS9jaGF0c2ApLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IGNoYXQudHlwZSxcbiAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGNoYXQudXNlcixcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiBjaGF0LmF2YXRhclxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBjaGF0LnRpbWVzdGFtcCxcbiAgICAgICAgICAgICAgICB1cmw6IGRvd25sb2FkVVJMLFxuICAgICAgICAgICAgICAgIGNoYXRJZDogY2hhdElkLFxuICAgICAgICAgICAgICAgIHF1b3RlOiBxdW90ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9oZWxwZXJzL2FwaS5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdBO0FBS0E7QUF1QkE7QUFNQTtBQU1BO0FBSUE7QUFhQTtBQUlBO0FBTUE7QUFNQTtBQU1BO0FBTUE7QUFNQTtBQUNBO0FBL0ZBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFWQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWRBO0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBOzs7OzsiLCJzb3VyY2VSb290IjoiIn0=