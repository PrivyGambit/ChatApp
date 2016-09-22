webpackHotUpdate(0,{

/***/ 435:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(241);

	var _redux = __webpack_require__(248);

	var _components = __webpack_require__(269);

	var _containers = __webpack_require__(239);

	var _rooms = __webpack_require__(436);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import style from './styles.css'

	// import { setAndHandleChatsListener, updateChats, removeChatsListener, searchChat } from 'redux/modules/chatsList'
	// import * as roomsActionCreators from 'redux/modules/rooms'


	var RoomContainer = function (_Component) {
	    _inherits(RoomContainer, _Component);

	    function RoomContainer(props) {
	        _classCallCheck(this, RoomContainer);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(RoomContainer).call(this, props));
	    }

	    _createClass(RoomContainer, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.props.actions.setAndHandleRoomsListener();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'container' },
	                _react2.default.createElement(_containers.RoomsListContainer, {
	                    user: this.props.user,
	                    error: this.props.error.rooms }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'mainContainer' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'chatListContainer' },
	                        _react2.default.createElement(_components.ChatsList, {
	                            chats: this.props.chats,
	                            user: this.props.user })
	                    ),
	                    this.props.currentRoom && _react2.default.createElement(_containers.ChatInputContainer, {
	                        currentRoom: this.props.currentRoom, user: this.props.user })
	                )
	            );
	        }
	    }]);

	    return RoomContainer;
	}(_react.Component);

	var mapStateToProps = function mapStateToProps(_ref) {
	    var users = _ref.users;
	    var chatsList = _ref.chatsList;
	    var chatInput = _ref.chatInput;
	    var rooms = _ref.rooms;

	    var cts = chatsList.chats;
	    var rms = rooms.rooms;
	    return {
	        user: users[users.authedId] ? users[users.authedId].info : {},
	        // isFetching: chatsList.isFetching,
	        error: {
	            chatsList: chatsList.error,
	            rooms: rooms.error
	        },
	        chats: Object.keys(cts).map(function (id) {
	            return cts[id];
	        }),
	        currentRoom: chatsList.roomId
	    };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: {
	            setAndHandleRoomsListener: function setAndHandleRoomsListener() {
	                return dispatch((0, _rooms.setAndHandleRoomsListener)());
	            }
	        }
	    };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RoomContainer);

/***/ }

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC45M2I3ZDgzOTAxZjBmYTYyMDBmNS5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2FwcC9jb250YWluZXJzL1Jvb20vUm9vbUNvbnRhaW5lci5qcz9iOWFjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBDaGF0c0xpc3QsIFNlYXJjaFJvb20gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzJ1xuaW1wb3J0IHsgQ2hhdElucHV0Q29udGFpbmVyLCBSb29tc0xpc3RDb250YWluZXIgfSBmcm9tICcuLi8uLi9jb250YWluZXJzJ1xuLy8gaW1wb3J0IHN0eWxlIGZyb20gJy4vc3R5bGVzLmNzcydcblxuLy8gaW1wb3J0IHsgc2V0QW5kSGFuZGxlQ2hhdHNMaXN0ZW5lciwgdXBkYXRlQ2hhdHMsIHJlbW92ZUNoYXRzTGlzdGVuZXIsIHNlYXJjaENoYXQgfSBmcm9tICdyZWR1eC9tb2R1bGVzL2NoYXRzTGlzdCdcbi8vIGltcG9ydCAqIGFzIHJvb21zQWN0aW9uQ3JlYXRvcnMgZnJvbSAncmVkdXgvbW9kdWxlcy9yb29tcydcbmltcG9ydCB7IHNldEFuZEhhbmRsZVJvb21zTGlzdGVuZXIgfSBmcm9tICcuLi8uLi9yZWR1eC9tb2R1bGVzL3Jvb21zJ1xuXG5jbGFzcyBSb29tQ29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yICggcHJvcHMgKSB7XG4gICAgICAgIHN1cGVyICggcHJvcHMgKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5hY3Rpb25zLnNldEFuZEhhbmRsZVJvb21zTGlzdGVuZXIoKVxuICAgIH1cblxuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxSb29tc0xpc3RDb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgdXNlcj17dGhpcy5wcm9wcy51c2VyfVxuICAgICAgICAgICAgICAgICAgICBlcnJvcj17dGhpcy5wcm9wcy5lcnJvci5yb29tc30gLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haW5Db250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGF0TGlzdENvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPENoYXRzTGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXRzPXt0aGlzLnByb3BzLmNoYXRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI9e3RoaXMucHJvcHMudXNlcn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jdXJyZW50Um9vbVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgPENoYXRJbnB1dENvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFJvb209e3RoaXMucHJvcHMuY3VycmVudFJvb219IHVzZXI9e3RoaXMucHJvcHMudXNlcn0gLz5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7dXNlcnMsIGNoYXRzTGlzdCwgY2hhdElucHV0LCByb29tc30pID0+IHtcbiAgICBjb25zdCBjdHMgPSBjaGF0c0xpc3QuY2hhdHNcbiAgICBjb25zdCBybXMgPSByb29tcy5yb29tc1xuICAgIHJldHVybiB7XG4gICAgICAgIHVzZXI6IHVzZXJzW3VzZXJzLmF1dGhlZElkXSA/IHVzZXJzW3VzZXJzLmF1dGhlZElkXS5pbmZvIDoge30sXG4gICAgICAgIC8vIGlzRmV0Y2hpbmc6IGNoYXRzTGlzdC5pc0ZldGNoaW5nLFxuICAgICAgICBlcnJvcjoge1xuICAgICAgICAgICAgY2hhdHNMaXN0OiBjaGF0c0xpc3QuZXJyb3IsXG4gICAgICAgICAgICByb29tczogcm9vbXMuZXJyb3IsXG4gICAgICAgIH0sXG4gICAgICAgIGNoYXRzOiBPYmplY3Qua2V5cyhjdHMpLm1hcCgoaWQpID0+IGN0c1tpZF0pLFxuICAgICAgICBjdXJyZW50Um9vbTogY2hhdHNMaXN0LnJvb21JZFxuICAgIH1cbn1cblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKCBkaXNwYXRjaCApID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3Rpb25zOiB7XG4gICAgICAgICAgICBzZXRBbmRIYW5kbGVSb29tc0xpc3RlbmVyOiAoKSA9PiBkaXNwYXRjaChzZXRBbmRIYW5kbGVSb29tc0xpc3RlbmVyKCkpLFxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKCBSb29tQ29udGFpbmVyIClcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGFwcC9jb250YWluZXJzL1Jvb20vUm9vbUNvbnRhaW5lci5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFJQTtBQUNBOzs7Ozs7OztBQUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBRUE7QUFSQTtBQUpBO0FBaUJBOzs7Ozs7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBREE7QUFLQTtBQUNBOzs7OzsiLCJzb3VyY2VSb290IjoiIn0=