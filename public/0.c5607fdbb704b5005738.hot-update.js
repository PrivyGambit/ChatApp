webpackHotUpdate(0,{

/***/ 446:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _utils = __webpack_require__(295);

	var _reactRouter = __webpack_require__(176);

	var _components = __webpack_require__(269);

	var _reactRedux = __webpack_require__(241);

	var _chatsList = __webpack_require__(439);

	var _rooms = __webpack_require__(436);

	var roomsActionCreators = _interopRequireWildcard(_rooms);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import style from './styles.css'


	var RoomsListContainer = function (_Component) {
	    _inherits(RoomsListContainer, _Component);

	    function RoomsListContainer(props) {
	        _classCallCheck(this, RoomsListContainer);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RoomsListContainer).call(this, props));

	        _this.state = {
	            isPressed: false,
	            query: '',
	            filteredData: _this.props.rooms
	        };
	        return _this;
	    }

	    _createClass(RoomsListContainer, [{
	        key: 'doSearch',
	        value: function doSearch(queryText) {
	            var _this2 = this;

	            var queryResult = [];
	            this.props.rooms.map(function (rm) {
	                if (rm.roomName.toLocaleLowerCase().indexOf(queryText) != -1) queryResult.push(rm);
	                _this2.setState({
	                    query: queryText,
	                    filteredData: queryResult
	                });
	            });
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps() {
	            this.setState({
	                filteredData: this.props.rooms
	            });
	        }
	    }, {
	        key: 'handleToggle',
	        value: function handleToggle() {
	            this.setState({
	                filteredData: this.props.rooms,
	                isPressed: !this.state.isPressed
	            });
	        }
	    }, {
	        key: 'handleSort',
	        value: function handleSort(e) {
	            var type = e.target.value;
	            switch (type) {
	                case 'name':
	                    document.getElementById('radioName').checked;
	                    this.filterByName();
	                    break;

	                case 'time':
	                    document.getElementById('radioTime').checked;
	                    this.filterByTime();
	                    break;
	                default:
	                    return false;
	            }
	        }
	    }, {
	        key: 'filterByTime',
	        value: function filterByTime() {
	            this.props.rooms.sort(function (a, b) {
	                if (a.latestUpdateTime > b.latestUpdateTime) return -1;
	                if (a.latestUpdateTime < b.latestUpdateTime) return 1;
	                return 0;
	            });
	            this.updatePropsToState();
	        }
	    }, {
	        key: 'filterByName',
	        value: function filterByName() {
	            this.props.rooms.sort(function (a, b) {
	                if (a.roomName < b.roomName) return -1;
	                if (a.roomName > b.roomName) return 1;
	                return 0;
	            });
	            this.updatePropsToState();
	        }
	    }, {
	        key: 'updatePropsToState',
	        value: function updatePropsToState() {
	            this.setState({
	                filteredData: this.props.rooms
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            // detect error property this.props.error
	            console.log(this.props);
	            return _react2.default.createElement(_components.RoomsList, {
	                isPressed: this.state.isPressed,
	                query: this.state.query,
	                handleToggle: this.handleToggle.bind(this),
	                doSearch: this.doSearch.bind(this),
	                handleSort: this.handleSort.bind(this),
	                filteredData: this.state.filteredData,
	                rooms: this.props.rooms,
	                removeChatsListener: this.props.actions.removeChatsListener.bind(this),
	                setAndHandleChatsListener: this.props.actions.setAndHandleChatsListener.bind(this) });
	        }
	    }]);

	    return RoomsListContainer;
	}(_react.Component);

	RoomsListContainer.PropTypes = {
	    rooms: _react.PropTypes.array.isRequired
	};

	RoomsListContainer.defaultProps = {
	    rooms: []
	};

	var mapStateToProps = function mapStateToProps(_ref) {
	    var rooms = _ref.rooms;

	    var rms = rooms.rooms;
	    return {
	        rooms: Object.keys(rms).map(function (id) {
	            return rms[id];
	        })
	    };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: {
	            setAndHandleChatsListener: function setAndHandleChatsListener(params) {
	                return dispatch((0, _chatsList.setAndHandleChatsListener)(params));
	            },
	            removeChatsListener: function removeChatsListener(id) {
	                return dispatch((0, _chatsList.removeChatsListener)(id));
	            }
	        }
	    };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RoomsListContainer);

/***/ }

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5jNTYwN2ZkYmI3MDRiNTAwNTczOC5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2FwcC9jb250YWluZXJzL1Jvb21zTGlzdC9Sb29tc0xpc3RDb250YWluZXIuanM/MDk1OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzLCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGZvcm1hdFJvb21OYW1lLCBmb3JtYXRUaW1lc3RhbXAgfSBmcm9tICcuLi8uLi9oZWxwZXJzL3V0aWxzJ1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcidcbi8vIGltcG9ydCBzdHlsZSBmcm9tICcuL3N0eWxlcy5jc3MnXG5pbXBvcnQgeyBSb29tc0xpc3QgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzJ1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgc2V0QW5kSGFuZGxlQ2hhdHNMaXN0ZW5lciwgdXBkYXRlQ2hhdHMsIHJlbW92ZUNoYXRzTGlzdGVuZXIsIHNlYXJjaENoYXQgfSBmcm9tICcuLi8uLi9yZWR1eC9tb2R1bGVzL2NoYXRzTGlzdCdcbmltcG9ydCAqIGFzIHJvb21zQWN0aW9uQ3JlYXRvcnMgZnJvbSAnLi4vLi4vcmVkdXgvbW9kdWxlcy9yb29tcydcbmltcG9ydCB7IHNldEFuZEhhbmRsZVJvb21zTGlzdGVuZXIgfSBmcm9tICcuLi8uLi9yZWR1eC9tb2R1bGVzL3Jvb21zJ1xuXG5jbGFzcyBSb29tc0xpc3RDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IgKCBwcm9wcyApIHtcbiAgICAgICAgc3VwZXIgKCBwcm9wcyApXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBpc1ByZXNzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcXVlcnk6ICcnLFxuICAgICAgICAgICAgZmlsdGVyZWREYXRhOiB0aGlzLnByb3BzLnJvb21zXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb1NlYXJjaCAoIHF1ZXJ5VGV4dCApIHtcbiAgICAgICAgbGV0IHF1ZXJ5UmVzdWx0ID0gW11cbiAgICAgICAgdGhpcy5wcm9wcy5yb29tcy5tYXAoKCBybSApID0+IHtcbiAgICAgICAgICAgIGlmICggcm0ucm9vbU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5VGV4dCkgIT0tMSApXG4gICAgICAgICAgICAgICAgcXVlcnlSZXN1bHQucHVzaChybSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeVRleHQsXG4gICAgICAgICAgICAgICAgZmlsdGVyZWREYXRhOiBxdWVyeVJlc3VsdFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzICgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBmaWx0ZXJlZERhdGE6IHRoaXMucHJvcHMucm9vbXNcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVUb2dnbGUgKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGZpbHRlcmVkRGF0YTogdGhpcy5wcm9wcy5yb29tcyxcbiAgICAgICAgICAgIGlzUHJlc3NlZDogIXRoaXMuc3RhdGUuaXNQcmVzc2VkXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlU29ydCAoIGUgKSB7XG4gICAgICAgIGxldCB0eXBlID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFkaW9OYW1lJykuY2hlY2tlZFxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnlOYW1lKClcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFkaW9UaW1lJykuY2hlY2tlZFxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnlUaW1lKClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlsdGVyQnlUaW1lICgpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5yb29tcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBpZihhLmxhdGVzdFVwZGF0ZVRpbWUgPiBiLmxhdGVzdFVwZGF0ZVRpbWUpIHJldHVybiAtMTtcbiAgICAgICAgICAgIGlmKGEubGF0ZXN0VXBkYXRlVGltZSA8IGIubGF0ZXN0VXBkYXRlVGltZSkgcmV0dXJuIDE7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy51cGRhdGVQcm9wc1RvU3RhdGUoKVxuICAgIH1cblxuICAgIGZpbHRlckJ5TmFtZSAoKSB7XG4gICAgICAgIHRoaXMucHJvcHMucm9vbXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgaWYoYS5yb29tTmFtZSA8IGIucm9vbU5hbWUpIHJldHVybiAtMTtcbiAgICAgICAgICAgIGlmKGEucm9vbU5hbWUgPiBiLnJvb21OYW1lKSByZXR1cm4gMTtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLnVwZGF0ZVByb3BzVG9TdGF0ZSgpXG4gICAgfVxuXG4gICAgdXBkYXRlUHJvcHNUb1N0YXRlICgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBmaWx0ZXJlZERhdGE6IHRoaXMucHJvcHMucm9vbXNcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZW5kZXIgKCkge1xuICAgICAgICAvLyBkZXRlY3QgZXJyb3IgcHJvcGVydHkgdGhpcy5wcm9wcy5lcnJvclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSb29tc0xpc3RcbiAgICAgICAgICAgICAgICBpc1ByZXNzZWQ9e3RoaXMuc3RhdGUuaXNQcmVzc2VkfVxuICAgICAgICAgICAgICAgIHF1ZXJ5PXt0aGlzLnN0YXRlLnF1ZXJ5fVxuICAgICAgICAgICAgICAgIGhhbmRsZVRvZ2dsZT17dGhpcy5oYW5kbGVUb2dnbGUuYmluZCggdGhpcyApfVxuICAgICAgICAgICAgICAgIGRvU2VhcmNoPXt0aGlzLmRvU2VhcmNoLmJpbmQoIHRoaXMgKX1cbiAgICAgICAgICAgICAgICBoYW5kbGVTb3J0PXt0aGlzLmhhbmRsZVNvcnQuYmluZCggdGhpcyApfVxuICAgICAgICAgICAgICAgIGZpbHRlcmVkRGF0YT17dGhpcy5zdGF0ZS5maWx0ZXJlZERhdGF9XG4gICAgICAgICAgICAgICAgcm9vbXM9e3RoaXMucHJvcHMucm9vbXN9XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2hhdHNMaXN0ZW5lcj17dGhpcy5wcm9wcy5hY3Rpb25zLnJlbW92ZUNoYXRzTGlzdGVuZXIuYmluZCggdGhpcyApfVxuICAgICAgICAgICAgICAgIHNldEFuZEhhbmRsZUNoYXRzTGlzdGVuZXI9e3RoaXMucHJvcHMuYWN0aW9ucy5zZXRBbmRIYW5kbGVDaGF0c0xpc3RlbmVyLmJpbmQoIHRoaXMgKX0gLz5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuUm9vbXNMaXN0Q29udGFpbmVyLlByb3BUeXBlcyA9IHtcbiAgICByb29tczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbn1cblxuUm9vbXNMaXN0Q29udGFpbmVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgICByb29tczogW11cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgcm9vbXMgfSkgPT4ge1xuICAgIGNvbnN0IHJtcyA9IHJvb21zLnJvb21zXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcm9vbXM6IE9iamVjdC5rZXlzKHJtcykubWFwKChpZCkgPT4gcm1zW2lkXSksXG4gICAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoIGRpc3BhdGNoICkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgICAgIHNldEFuZEhhbmRsZUNoYXRzTGlzdGVuZXI6ICggcGFyYW1zICkgPT4gZGlzcGF0Y2goc2V0QW5kSGFuZGxlQ2hhdHNMaXN0ZW5lciggcGFyYW1zICkpLFxuICAgICAgICAgICAgcmVtb3ZlQ2hhdHNMaXN0ZW5lcjogKGlkKSA9PiBkaXNwYXRjaChyZW1vdmVDaGF0c0xpc3RlbmVyKGlkKSksXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxuICAgIG1hcERpc3BhdGNoVG9Qcm9wcyxcbikoIFJvb21zTGlzdENvbnRhaW5lciApXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBhcHAvY29udGFpbmVycy9Sb29tc0xpc3QvUm9vbXNMaXN0Q29udGFpbmVyLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTs7Ozs7Ozs7OztBQUxBO0FBQ0E7QUFDQTtBQUtBOzs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUZBO0FBT0E7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFYQTtBQWFBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7QUFHQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBREE7QUFNQTtBQUNBOzs7OzsiLCJzb3VyY2VSb290IjoiIn0=