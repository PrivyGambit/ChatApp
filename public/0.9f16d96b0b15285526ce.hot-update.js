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
	            // signInAnonymous() //sign in as anonymous
	            var email = 'anonymous@anonymous.com';
	            var password = 'anonymous';
	            (0, _constants.firebaseAuth)().signInWithEmailAndPassword(email, password).catch(function (error) {
	                return error.message;
	            });
	        }
	    });

	    (0, _constants.firebaseAuth)().onAuthStateChanged(function (user) {
	        console.log(user);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC45ZjE2ZDk2YjBiMTUyODU1MjZjZS5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2FwcC9oZWxwZXJzL2FwaS5qcz8yNTJiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZiwgc3RvcmFnZVJlZiwgZmlyZWJhc2VBdXRoIH0gZnJvbSAnLi4vY29uZmlnL2NvbnN0YW50cydcbmltcG9ydCB7IHNpZ25JbkFub255bW91cywgY2hlY2tJZlNpZ25lZCB9IGZyb20gJy4vYXV0aCdcblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVSb29tIChyb29tKSB7XG4gICAgY29uc3Qgcm9vbUlkID0gcmVmLmNoaWxkKCdyb29tcycpLnB1c2goKS5rZXlcbiAgICByZXR1cm4gcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH1gKS5zZXQoey4uLnJvb20sIHJvb21JZH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlQ2hhdCAoIGNoYXQsIHJvb21JZCwgcXVvdGUgKSB7XG4gICAgcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH1gKS51cGRhdGUoe1xuICAgICAgICBsYXRlc3RVcGRhdGVUaW1lOiBjaGF0LnRpbWVzdGFtcFxuICAgIH0pXG4gICAgcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH0vbmV3Q29udGVudGApLnVwZGF0ZSh7XG4gICAgICAgIGNoYXQ6IGNoYXQuY29udGVudCxcbiAgICAgICAgdXNlcjogY2hhdC51c2VyXG4gICAgfSlcbiAgICBjb25zdCBjaGF0SWQgPSByZWYuY2hpbGQoYHJvb21zLyR7cm9vbUlkfS9jaGF0c2ApLnB1c2goKS5rZXlcbiAgICByZXR1cm4gcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH0vY2hhdHMvJHsgY2hhdElkIH1gKS51cGRhdGUoe1xuICAgICAgICB0eXBlOiBjaGF0LnR5cGUsXG4gICAgICAgIGNvbnRlbnQ6IGNoYXQuY29udGVudCxcbiAgICAgICAgdGltZXN0YW1wOiBjaGF0LnRpbWVzdGFtcCxcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgbmFtZTogY2hhdC51c2VyLFxuICAgICAgICAgICAgYXZhdGFyOiBjaGF0LmF2YXRhclxuICAgICAgICB9LFxuICAgICAgICBjaGF0SWQ6IGNoYXRJZCxcbiAgICAgICAgcXVvdGU6IHF1b3RlLFxuICAgICAgICBhbm5vdW5jZW1lbnQ6IGNoYXQuYW5ub3VuY2VtZW50XG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhblVzZXIgKHVzZXJJZCkge1xuICAgIHJldHVybiByZWYuY2hpbGQoYHVzZXJzLyR7dXNlcklkfS9pbmZvYCkudXBkYXRlKHtcbiAgICAgICAgYmFubmVkOiB0cnVlXG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuQmFuVXNlciAodXNlcklkKSB7XG4gICAgcmV0dXJuIHJlZi5jaGlsZChgdXNlcnMvJHt1c2VySWR9L2luZm9gKS51cGRhdGUoe1xuICAgICAgICBiYW5uZWQ6IGZhbHNlXG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUNoYXQgKCByb29tSWQsIGNoYXRJZCApIHtcbiAgICByZXR1cm4gcmVmLmNoaWxkKGByb29tcy8keyByb29tSWQgfS9jaGF0cy8keyBjaGF0SWQgfWApLnJlbW92ZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5Ub1Jvb21zIChjYiwgZXJyb3IpIHtcbiAgICAvL2NoZWNrIGlmIHVzZXIgaXMgbG9nZ2VkIG9yIG5vdFxuICAgIGZpcmViYXNlQXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZCgodXNlcikgPT4ge1xuICAgICAgICBpZiAoICF1c2VyICkge1xuICAgICAgICAgICAgLy8gc2lnbkluQW5vbnltb3VzKCkgLy9zaWduIGluIGFzIGFub255bW91c1xuICAgICAgICAgICAgbGV0IGVtYWlsID0gJ2Fub255bW91c0Bhbm9ueW1vdXMuY29tJ1xuICAgICAgICAgICAgbGV0IHBhc3N3b3JkID0gJ2Fub255bW91cydcbiAgICAgICAgICAgIGZpcmViYXNlQXV0aCgpLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzd29yZCkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgZmlyZWJhc2VBdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKCh1c2VyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHVzZXIpO1xuICAgIH0pXG5cbiAgICByZXR1cm4gcmVmLmNoaWxkKCdyb29tcycpLm9uKCd2YWx1ZScsIChzbmFwc2hvdCkgPT4ge1xuICAgICAgICByZXR1cm4gY2Ioc25hcHNob3QudmFsKCkgfHwge30pXG4gICAgfSwgZXJyb3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0dXJuT2ZmTGlzdGVuZXIgKHJvb21JZCkge1xuICAgIHJldHVybiByZWYuY2hpbGQoYHJvb21zLyR7cm9vbUlkfS9jaGF0c2ApLm9mZigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlzdGVuVG9DaGF0cyAocm9vbUlkLCBjYiwgZXJyb3IpIHtcbiAgICByZXR1cm4gcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH0vY2hhdHNgKS5vbigndmFsdWUnLCAoc25hcHNob3QpID0+IHtcbiAgICAgICAgcmV0dXJuIGNiKHNuYXBzaG90LnZhbCgpIHx8IHt9KVxuICAgIH0sIGVycm9yKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hSb29tcyAoKSB7XG4gICAgcmV0dXJuIHJlZi5jaGlsZCgncm9vbXMvJylcbiAgICAgICAgLnRoZW4oKHNuYXBzaG90KSA9PiBzbmFwc2hvdC52YWwoKSB8fCB7fSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUud2FybignRXJyb3IgZmV0Y2hpbmcgcm9vbXMnLCBlcnIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hSb29tcyAoKSB7XG4gICAgcmV0dXJuIHJlZi5jaGlsZCgncm9vbXMvJylcbiAgICAgICAgLnRoZW4oKHNuYXBzaG90KSA9PiBzbmFwc2hvdC52YWwoKSB8fCB7fSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUud2FybignRXJyb3IgZmV0Y2hpbmcgcm9vbXMnLCBlcnIpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hVc2VyICh1aWQpIHtcbiAgICByZXR1cm4gcmVmLmNoaWxkKGB1c2Vycy8ke3VpZH1gKS5vbmNlKCd2YWx1ZScpXG4gICAgICAgIC50aGVuKChzbmFwc2hvdCkgPT4gc25hcHNob3QudmFsKCkgfHwge30pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLndhcm4oJ0Vycm9yIGZldGNoaW5nIHRoZSB1c2VyJywgZXJyKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3RlblRvVXNlcnNMaXN0IChjYiwgZXJyb3IpIHtcbiAgICByZXR1cm4gcmVmLmNoaWxkKCd1c2VycycpLm9uKCd2YWx1ZScsIChzbmFwc2hvdCkgPT4ge1xuICAgICAgICByZXR1cm4gY2Ioc25hcHNob3QudmFsKCkgfHwge30pXG4gICAgfSwgZXJyb3IpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGxvYWRGaWxlICggZmlsZSwgY2hhdCwgcm9vbUlkLCBxdW90ZSApIHtcbiAgICBsZXQgbWV0YWRhdGEgPSB7XG4gICAgICAgIGNvbnRlbnRUeXBlOiAnaW1hZ2UvanBlZydcbiAgICB9O1xuXG4gICAgLy8gVXBsb2FkIGZpbGUgYW5kIG1ldGFkYXRhIHRvIHRoZSBvYmplY3QgJ2ltYWdlcy9tb3VudGFpbnMuanBnJ1xuICAgIGxldCB1cGxvYWRUYXNrID0gc3RvcmFnZVJlZi5jaGlsZCgnaW1hZ2VzLycgKyBmaWxlLm5hbWUpLnB1dChmaWxlLCBtZXRhZGF0YSk7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHN0YXRlIGNoYW5nZXMsIGVycm9ycywgYW5kIGNvbXBsZXRpb24gb2YgdGhlIHVwbG9hZC5cbiAgICB1cGxvYWRUYXNrLm9uKGZpcmViYXNlLnN0b3JhZ2UuVGFza0V2ZW50LlNUQVRFX0NIQU5HRUQsIC8vIG9yICdzdGF0ZV9jaGFuZ2VkJ1xuICAgICAgICBmdW5jdGlvbiggc25hcHNob3QgKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGFzayBwcm9ncmVzcywgaW5jbHVkaW5nIHRoZSBudW1iZXIgb2YgYnl0ZXMgdXBsb2FkZWQgYW5kIHRoZSB0b3RhbCBudW1iZXIgb2YgYnl0ZXMgdG8gYmUgdXBsb2FkZWRcbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IChzbmFwc2hvdC5ieXRlc1RyYW5zZmVycmVkIC8gc25hcHNob3QudG90YWxCeXRlcykgKiAxMDA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVXBsb2FkIGlzICcgKyBwcm9ncmVzcyArICclIGRvbmUnKTtcbiAgICAgICAgICAgIHN3aXRjaCAoc25hcHNob3Quc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGZpcmViYXNlLnN0b3JhZ2UuVGFza1N0YXRlLlBBVVNFRDogLy8gb3IgJ3BhdXNlZCdcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VwbG9hZCBpcyBwYXVzZWQnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGZpcmViYXNlLnN0b3JhZ2UuVGFza1N0YXRlLlJVTk5JTkc6IC8vIG9yICdydW5uaW5nJ1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVXBsb2FkIGlzIHJ1bm5pbmcnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXJyb3IuY29kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0b3JhZ2UvdW5hdXRob3JpemVkJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlciBkb2Vzbid0IGhhdmUgcGVybWlzc2lvbiB0byBhY2Nlc3MgdGhlIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzdG9yYWdlL2NhbmNlbGVkJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlciBjYW5jZWxlZCB0aGUgdXBsb2FkXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0b3JhZ2UvdW5rbm93bic6XG4gICAgICAgICAgICAgICAgICAgIC8vIFVua25vd24gZXJyb3Igb2NjdXJyZWQsIGluc3BlY3QgZXJyb3Iuc2VydmVyUmVzcG9uc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIFVwbG9hZCBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LCBub3cgd2UgY2FuIGdldCB0aGUgZG93bmxvYWQgVVJMXG4gICAgICAgICAgICBsZXQgZG93bmxvYWRVUkwgPSB1cGxvYWRUYXNrLnNuYXBzaG90LmRvd25sb2FkVVJMO1xuICAgICAgICAgICAgY29uc3QgY2hhdElkID0gcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH0vY2hhdHNgKS5wdXNoKCkua2V5XG4gICAgICAgICAgICByZXR1cm4gcmVmLmNoaWxkKGByb29tcy8ke3Jvb21JZH0vY2hhdHNgKS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBjaGF0LnR5cGUsXG4gICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjaGF0LnVzZXIsXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcjogY2hhdC5hdmF0YXJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogY2hhdC50aW1lc3RhbXAsXG4gICAgICAgICAgICAgICAgdXJsOiBkb3dubG9hZFVSTCxcbiAgICAgICAgICAgICAgICBjaGF0SWQ6IGNoYXRJZCxcbiAgICAgICAgICAgICAgICBxdW90ZTogcXVvdGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvaGVscGVycy9hcGkuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHQTtBQUtBO0FBdUJBO0FBTUE7QUFNQTtBQUlBO0FBc0JBO0FBSUE7QUFNQTtBQU1BO0FBTUE7QUFNQTtBQU1BO0FBQ0E7QUF4R0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQVZBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZEE7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7Ozs7OyIsInNvdXJjZVJvb3QiOiIifQ==