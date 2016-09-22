webpackHotUpdate(0,{

/***/ 436:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.setAndHandleRoomsListener = setAndHandleRoomsListener;
	exports.default = rooms;

	var _api = __webpack_require__(429);

	var _listeners = __webpack_require__(437);

	var SETTINGS_ROOMS_LISTENER = 'SETTINGS_ROOMS_LISTENER';
	var SETTINGS_ROOMS_LISTENER_ERROR = 'SETTINGS_ROOMS_LISTENER_ERROR';
	var SETTINGS_ROOMS_LISTENER_SUCCESS = 'SETTINGS_ROOMS_LISTENER_SUCCESS';
	var UPDATE_ROOM_NAME = 'UPDATE_ROOM_NAME';

	function settingRoomsListener() {
	    return {
	        type: SETTINGS_ROOMS_LISTENER
	    };
	}

	function settingRoomsListenerError(error) {
	    return {
	        type: SETTINGS_ROOMS_LISTENER_ERROR,
	        error: error
	    };
	}

	function settingRoomsListenerSuccess(rooms) {
	    return {
	        type: SETTINGS_ROOMS_LISTENER_SUCCESS,
	        rooms: rooms
	    };
	}

	function setAndHandleRoomsListener() {
	    return function (dispatch, getState) {
	        if (getState().listeners.rooms === true) {
	            return;
	        }

	        dispatch((0, _listeners.addListener)('rooms'));
	        dispatch(settingRoomsListener());

	        (0, _api.listenToRooms)(function (rooms) {
	            dispatch(settingRoomsListenerSuccess(rooms));
	        }, function (error) {
	            return dispatch(settingRoomsListenerError(error));
	        });
	    };
	}

	var initialState = {
	    isFetching: true,
	    error: '',
	    rooms: {}
	};

	function rooms() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case SETTINGS_ROOMS_LISTENER:
	            return _extends({}, state, {
	                isFetching: true
	            });
	        case SETTINGS_ROOMS_LISTENER_ERROR:
	            return _extends({}, state, {
	                isFetching: false,
	                error: action.error
	            });
	        case SETTINGS_ROOMS_LISTENER_SUCCESS:
	            return _extends({}, state, {
	                isFetching: false,
	                error: '',
	                rooms: _extends({}, state.rooms, action.rooms)
	            });
	        default:
	            return state;
	    }
		}

/***/ }

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5jOGVhNzE0NTMyMjQyNmFiMzUzNy5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2FwcC9yZWR1eC9tb2R1bGVzL3Jvb21zLmpzPzM3ZGIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbGlzdGVuVG9Sb29tcyB9IGZyb20gJy4uLy4uL2hlbHBlcnMvYXBpJ1xuaW1wb3J0IHsgYWRkTGlzdGVuZXIgfSBmcm9tICcuL2xpc3RlbmVycydcblxuY29uc3QgU0VUVElOR1NfUk9PTVNfTElTVEVORVIgPSAnU0VUVElOR1NfUk9PTVNfTElTVEVORVInXG5jb25zdCBTRVRUSU5HU19ST09NU19MSVNURU5FUl9FUlJPUiA9ICdTRVRUSU5HU19ST09NU19MSVNURU5FUl9FUlJPUidcbmNvbnN0IFNFVFRJTkdTX1JPT01TX0xJU1RFTkVSX1NVQ0NFU1MgPSAnU0VUVElOR1NfUk9PTVNfTElTVEVORVJfU1VDQ0VTUydcbmNvbnN0IFVQREFURV9ST09NX05BTUUgPSAnVVBEQVRFX1JPT01fTkFNRSc7XG5cbmZ1bmN0aW9uIHNldHRpbmdSb29tc0xpc3RlbmVyICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBTRVRUSU5HU19ST09NU19MSVNURU5FUixcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldHRpbmdSb29tc0xpc3RlbmVyRXJyb3IgKGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogU0VUVElOR1NfUk9PTVNfTElTVEVORVJfRVJST1IsXG4gICAgICAgIGVycm9yXG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXR0aW5nUm9vbXNMaXN0ZW5lclN1Y2Nlc3MgKHJvb21zKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogU0VUVElOR1NfUk9PTVNfTElTVEVORVJfU1VDQ0VTUyxcbiAgICAgICAgcm9vbXMsXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QW5kSGFuZGxlUm9vbXNMaXN0ZW5lciAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCwgZ2V0U3RhdGUpIHtcbiAgICAgICAgaWYgKGdldFN0YXRlKCkubGlzdGVuZXJzLnJvb21zID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGRpc3BhdGNoKGFkZExpc3RlbmVyKCdyb29tcycpKVxuICAgICAgICBkaXNwYXRjaChzZXR0aW5nUm9vbXNMaXN0ZW5lcigpKVxuXG4gICAgICAgIGxpc3RlblRvUm9vbXMoKHJvb21zKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaChzZXR0aW5nUm9vbXNMaXN0ZW5lclN1Y2Nlc3Mocm9vbXMpKVxuICAgICAgICB9LCAoZXJyb3IpID0+IGRpc3BhdGNoKHNldHRpbmdSb29tc0xpc3RlbmVyRXJyb3IoZXJyb3IpKSlcbiAgICB9XG59XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICBpc0ZldGNoaW5nOiB0cnVlLFxuICAgIGVycm9yOiAnJyxcbiAgICByb29tczoge30sXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvb21zIChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gICAgc3dpdGNoICggYWN0aW9uLnR5cGUgKSB7XG4gICAgICAgIGNhc2UgU0VUVElOR1NfUk9PTVNfTElTVEVORVIgOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICBpc0ZldGNoaW5nOiB0cnVlLFxuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlIFNFVFRJTkdTX1JPT01TX0xJU1RFTkVSX0VSUk9SIDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgaXNGZXRjaGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGFjdGlvbi5lcnJvcixcbiAgICAgICAgICAgIH1cbiAgICAgICAgY2FzZSBTRVRUSU5HU19ST09NU19MSVNURU5FUl9TVUNDRVNTIDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgaXNGZXRjaGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6ICcnLFxuICAgICAgICAgICAgICAgIHJvb21zOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlLnJvb21zLFxuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpb24ucm9vbXMsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9yZWR1eC9tb2R1bGVzL3Jvb21zLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBNEJBO0FBcUJBO0FBQ0E7QUFsREE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBRkE7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUpBO0FBU0E7QUFDQTtBQXZCQTtBQXlCQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=