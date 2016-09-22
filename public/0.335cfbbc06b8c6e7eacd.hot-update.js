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
	            console.log((0, _auth.signInAnonymous)()); //sign in as anonymous
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC4zMzVjZmJiYzA2YjhjNmU3ZWFjZC5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2FwcC9oZWxwZXJzL2FwaS5qcz8yNTJiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZiwgc3RvcmFnZVJlZiwgZmlyZWJhc2VBdXRoIH0gZnJvbSAnLi4vY29uZmlnL2NvbnN0YW50cydcbmltcG9ydCB7IHNpZ25JbkFub255bW91cywgY2hlY2tJZlNpZ25lZCB9IGZyb20gJy4vYXV0aCdcblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVSb29tIChyb29tKSB7XG4gICAgY29uc3Qgcm9vbUlkID0gcmVmLmNoaWxkKCdyb29tcycpLnB1c2goKS5rZXlcbiAgICByZXR1cm4gcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH1gKS5zZXQoey4uLnJvb20sIHJvb21JZH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlQ2hhdCAoIGNoYXQsIHJvb21JZCwgcXVvdGUgKSB7XG4gICAgcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH1gKS51cGRhdGUoe1xuICAgICAgICBsYXRlc3RVcGRhdGVUaW1lOiBjaGF0LnRpbWVzdGFtcFxuICAgIH0pXG4gICAgcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH0vbmV3Q29udGVudGApLnVwZGF0ZSh7XG4gICAgICAgIGNoYXQ6IGNoYXQuY29udGVudCxcbiAgICAgICAgdXNlcjogY2hhdC51c2VyXG4gICAgfSlcbiAgICBjb25zdCBjaGF0SWQgPSByZWYuY2hpbGQoYHJvb21zLyR7cm9vbUlkfS9jaGF0c2ApLnB1c2goKS5rZXlcbiAgICByZXR1cm4gcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH0vY2hhdHMvJHsgY2hhdElkIH1gKS51cGRhdGUoe1xuICAgICAgICB0eXBlOiBjaGF0LnR5cGUsXG4gICAgICAgIGNvbnRlbnQ6IGNoYXQuY29udGVudCxcbiAgICAgICAgdGltZXN0YW1wOiBjaGF0LnRpbWVzdGFtcCxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgbmFtZTogY2hhdC51c2VyLFxuICAgICAgICAgICAgYXZhdGFyOiBjaGF0LmF2YXRhclxuICAgICAgICB9LFxuICAgICAgICBjaGF0SWQ6IGNoYXRJZCxcbiAgICAgICAgcXVvdGU6IHF1b3RlLFxuICAgICAgICBhbm5vdW5jZW1lbnQ6IGNoYXQuYW5ub3VuY2VtZW50XG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhblVzZXIgKHVzZXJJZCkge1xuICAgIHJldHVybiByZWYuY2hpbGQoYHVzZXJzLyR7dXNlcklkfS9pbmZvYCkudXBkYXRlKHtcbiAgICAgICAgYmFubmVkOiB0cnVlXG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuQmFuVXNlciAodXNlcklkKSB7XG4gICAgcmV0dXJuIHJlZi5jaGlsZChgdXNlcnMvJHt1c2VySWR9L2luZm9gKS51cGRhdGUoe1xuICAgICAgICBiYW5uZWQ6IGZhbHNlXG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUNoYXQgKCByb29tSWQsIGNoYXRJZCApIHtcbiAgICByZXR1cm4gcmVmLmNoaWxkKGByb29tcy8keyByb29tSWQgfS9jaGF0cy8keyBjaGF0SWQgfWApLnJlbW92ZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5Ub1Jvb21zIChjYiwgZXJyb3IpIHtcbiAgICAvL2NoZWNrIGlmIHVzZXIgaXMgbG9nZ2VkIG9yIG5vdFxuICAgIGZpcmViYXNlQXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZCgodXNlcikgPT4ge1xuICAgICAgICBpZiAoICF1c2VyICkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coc2lnbkluQW5vbnltb3VzKCkpOyAvL3NpZ24gaW4gYXMgYW5vbnltb3VzXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlZi5jaGlsZCgncm9vbXMnKS5vbigndmFsdWUnLCAoc25hcHNob3QpID0+IHtcbiAgICAgICAgcmV0dXJuIGNiKHNuYXBzaG90LnZhbCgpIHx8IHt9KVxuICAgIH0sIGVycm9yKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdHVybk9mZkxpc3RlbmVyIChyb29tSWQpIHtcbiAgICByZXR1cm4gcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH0vY2hhdHNgKS5vZmYoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3RlblRvQ2hhdHMgKHJvb21JZCwgY2IsIGVycm9yKSB7XG4gICAgcmV0dXJuIHJlZi5jaGlsZChgcm9vbXMvJHtyb29tSWR9L2NoYXRzYCkub24oJ3ZhbHVlJywgKHNuYXBzaG90KSA9PiB7XG4gICAgICAgIHJldHVybiBjYihzbmFwc2hvdC52YWwoKSB8fCB7fSlcbiAgICB9LCBlcnJvcilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoUm9vbXMgKCkge1xuICAgIHJldHVybiByZWYuY2hpbGQoJ3Jvb21zLycpXG4gICAgICAgIC50aGVuKChzbmFwc2hvdCkgPT4gc25hcHNob3QudmFsKCkgfHwge30pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLndhcm4oJ0Vycm9yIGZldGNoaW5nIHJvb21zJywgZXJyKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoUm9vbXMgKCkge1xuICAgIHJldHVybiByZWYuY2hpbGQoJ3Jvb21zLycpXG4gICAgICAgIC50aGVuKChzbmFwc2hvdCkgPT4gc25hcHNob3QudmFsKCkgfHwge30pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLndhcm4oJ0Vycm9yIGZldGNoaW5nIHJvb21zJywgZXJyKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoVXNlciAodWlkKSB7XG4gICAgcmV0dXJuIHJlZi5jaGlsZChgdXNlcnMvJHt1aWR9YCkub25jZSgndmFsdWUnKVxuICAgICAgICAudGhlbigoc25hcHNob3QpID0+IHNuYXBzaG90LnZhbCgpIHx8IHt9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS53YXJuKCdFcnJvciBmZXRjaGluZyB0aGUgdXNlcicsIGVycikpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5Ub1VzZXJzTGlzdCAoY2IsIGVycm9yKSB7XG4gICAgcmV0dXJuIHJlZi5jaGlsZCgndXNlcnMnKS5vbigndmFsdWUnLCAoc25hcHNob3QpID0+IHtcbiAgICAgICAgcmV0dXJuIGNiKHNuYXBzaG90LnZhbCgpIHx8IHt9KVxuICAgIH0sIGVycm9yKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBsb2FkRmlsZSAoIGZpbGUsIGNoYXQsIHJvb21JZCwgcXVvdGUgKSB7XG4gICAgbGV0IG1ldGFkYXRhID0ge1xuICAgICAgICBjb250ZW50VHlwZTogJ2ltYWdlL2pwZWcnXG4gICAgfTtcblxuICAgIC8vIFVwbG9hZCBmaWxlIGFuZCBtZXRhZGF0YSB0byB0aGUgb2JqZWN0ICdpbWFnZXMvbW91bnRhaW5zLmpwZydcbiAgICBsZXQgdXBsb2FkVGFzayA9IHN0b3JhZ2VSZWYuY2hpbGQoJ2ltYWdlcy8nICsgZmlsZS5uYW1lKS5wdXQoZmlsZSwgbWV0YWRhdGEpO1xuXG4gICAgLy8gTGlzdGVuIGZvciBzdGF0ZSBjaGFuZ2VzLCBlcnJvcnMsIGFuZCBjb21wbGV0aW9uIG9mIHRoZSB1cGxvYWQuXG4gICAgdXBsb2FkVGFzay5vbihmaXJlYmFzZS5zdG9yYWdlLlRhc2tFdmVudC5TVEFURV9DSEFOR0VELCAvLyBvciAnc3RhdGVfY2hhbmdlZCdcbiAgICAgICAgZnVuY3Rpb24oIHNuYXBzaG90ICkge1xuICAgICAgICAgICAgLy8gR2V0IHRhc2sgcHJvZ3Jlc3MsIGluY2x1ZGluZyB0aGUgbnVtYmVyIG9mIGJ5dGVzIHVwbG9hZGVkIGFuZCB0aGUgdG90YWwgbnVtYmVyIG9mIGJ5dGVzIHRvIGJlIHVwbG9hZGVkXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSAoc25hcHNob3QuYnl0ZXNUcmFuc2ZlcnJlZCAvIHNuYXBzaG90LnRvdGFsQnl0ZXMpICogMTAwO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1VwbG9hZCBpcyAnICsgcHJvZ3Jlc3MgKyAnJSBkb25lJyk7XG4gICAgICAgICAgICBzd2l0Y2ggKHNuYXBzaG90LnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBmaXJlYmFzZS5zdG9yYWdlLlRhc2tTdGF0ZS5QQVVTRUQ6IC8vIG9yICdwYXVzZWQnXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVcGxvYWQgaXMgcGF1c2VkJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBmaXJlYmFzZS5zdG9yYWdlLlRhc2tTdGF0ZS5SVU5OSU5HOiAvLyBvciAncnVubmluZydcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VwbG9hZCBpcyBydW5uaW5nJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGVycm9yLmNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdG9yYWdlL3VuYXV0aG9yaXplZCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIFVzZXIgZG9lc24ndCBoYXZlIHBlcm1pc3Npb24gdG8gYWNjZXNzIHRoZSBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnc3RvcmFnZS9jYW5jZWxlZCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIFVzZXIgY2FuY2VsZWQgdGhlIHVwbG9hZFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzdG9yYWdlL3Vua25vd24nOlxuICAgICAgICAgICAgICAgICAgICAvLyBVbmtub3duIGVycm9yIG9jY3VycmVkLCBpbnNwZWN0IGVycm9yLnNlcnZlclJlc3BvbnNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBVcGxvYWQgY29tcGxldGVkIHN1Y2Nlc3NmdWxseSwgbm93IHdlIGNhbiBnZXQgdGhlIGRvd25sb2FkIFVSTFxuICAgICAgICAgICAgbGV0IGRvd25sb2FkVVJMID0gdXBsb2FkVGFzay5zbmFwc2hvdC5kb3dubG9hZFVSTDtcbiAgICAgICAgICAgIGNvbnN0IGNoYXRJZCA9IHJlZi5jaGlsZChgcm9vbXMvJHtyb29tSWR9L2NoYXRzYCkucHVzaCgpLmtleVxuICAgICAgICAgICAgcmV0dXJuIHJlZi5jaGlsZChgcm9vbXMvJHtyb29tSWR9L2NoYXRzYCkucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogY2hhdC50eXBlLFxuICAgICAgICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogY2hhdC51c2VyLFxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI6IGNoYXQuYXZhdGFyXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGNoYXQudGltZXN0YW1wLFxuICAgICAgICAgICAgICAgIHVybDogZG93bmxvYWRVUkwsXG4gICAgICAgICAgICAgICAgY2hhdElkOiBjaGF0SWQsXG4gICAgICAgICAgICAgICAgcXVvdGU6IHF1b3RlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogYXBwL2hlbHBlcnMvYXBpLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR0E7QUFLQTtBQXVCQTtBQU1BO0FBTUE7QUFJQTtBQWFBO0FBSUE7QUFNQTtBQU1BO0FBTUE7QUFNQTtBQU1BO0FBQ0E7QUEvRkE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQVZBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7Ozs7OyIsInNvdXJjZVJvb3QiOiIifQ==