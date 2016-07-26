import React, { PropTypes } from 'react'
import { formatRoomName, formatTimestamp } from 'helpers/utils'
import { Link } from 'react-router'
import style from './styles.css'
import classNames from 'classnames'
import TimeAgo from 'react-timeago'

export default class RoomsList extends React.Component {

  constructor ( props ) {
    super ( props )
    this.state = {
      isPressed: false,
      query: '',
      filteredData: this.props.rooms
    }
  }

  doSearch ( queryText ) {
    let queryResult = []
    this.props.rooms.map(( rm )=>{
      if ( rm.roomName.toLocaleLowerCase().indexOf(queryText) !=-1 )
      queryResult.push(rm)

      this.setState({
        query: queryText,
        filteredData: queryResult
      })
    })
  }

  componentWillReceiveProps () {
    this.setState({
      filteredData: this.props.rooms
    })
  }

  handleToggle () {
    this.filterByTime()
    this.setState({
      filteredData: this.props.rooms,
      isPressed: !this.state.isPressed
    })
  }

  handleSort (e) {
    let type = e.target.value
    switch (type) {
      case 'name':
        this.filterByName()
      break;

      case 'time':
        this.filterByTime()
      break

      default:
        return false
    }
  }

  filterByTime () {
    this.props.rooms.sort((a, b) => {
      if(a.latestUpdateTime > b.latestUpdateTime) return -1;
      if(a.latestUpdateTime < b.latestUpdateTime) return 1;
      return 0;
    })
    this.updatePropsToState()
  }

  filterByName () {
    this.props.rooms.sort((a, b) => {
      if(a.roomName < b.roomName) return -1;
      if(a.roomName > b.roomName) return 1;
      return 0;
    })
    this.updatePropsToState()
  }

  updatePropsToState () {
    this.setState({
      filteredData: this.props.rooms
    })
  }

  render () {
    let list = ''
    if ( this.state.isPressed )
    list = <DisplayRoomsList data={this.state.filteredData}/>

    return (
      <div className={style.wrapper}>
        <h5>Sort By:</h5>
        <div className="input-group">
          <label className={style.label}>
            <input
              value="name"
              onChange={this.handleSort.bind(this)}
              name="radioBtn"
              className={style.radio}
              type="radio"
              aria-label="labelName" />
            Name
          </label>
        </div>
        <div className="input-group">
          <label className={style.label}>
            <input
              value="time"
              onChange={this.handleSort.bind(this)}
              name="radioBtn"
              className={style.radio}
              type="radio"
              aria-label="labelName"
              checked="checked" />
            Latest Update
          </label>
        </div>
        <div className={`${style.toggle} btn btn-default`}>
          { this.state.isPressed ? <SearchBox query={this.state.query} doSearch={this.doSearch.bind(this)} /> : '' }
          <span
            className={`${style.arrow} caret`}
            onClick={this.handleToggle.bind(this)} ></span>
        </div>
        {list}
      </div>
    )
  }
}

RoomsList.PropTypes = {
  rooms: PropTypes.array.isRequired,
}

RoomsList.defaultProps = {
  rooms: []
}

class SearchBox extends React.Component {
  constructor (props) {
    super( props )
  }
  doSearch ( e ) {
    this.props.doSearch(e.target.value)
  }
  render () {
    return (
      <div className={`input-group ${style.searchInput}`}>
        <input
          className='form-control'
          value={this.props.query}
          onChange={this.doSearch.bind( this )}
          type='text'
          placeholder='Enter search keyword'
          />
      </div>
    )
  }
}

class DisplayRoomsList extends React.Component {
  constructor ( props ) {
    super( props )
  }

  formatContentChat ( text ) {
    let string = text
    if ( text.length > 80 ) {
      string = text.substring(0, 80)
      string += '...'
    }
    return string
  }

  render () {
    return (
      <ul className={`${style.btnPressed} ${style.list} list-group`}>
        {this.props.data.map((room) => {
          const id = room.roomId
          return (
            <li key={id} className={style.listItem}>
              <Link to={`rooms/${id}`} className={`${style.anchor} list-group-item`}>
                {room.roomName}
                <div className={style.updateGroup}>
                  <p className={`${style.updateLabel} ${style.author}`}>{room.newContent.user ? room.newContent.user : 'Anonymous'}: </p>
                  <p className={style.updateLabel}>{room.newContent.chat ? this.formatContentChat( room.newContent.chat ) : 'Text here'} - </p>
                  <TimeAgo date={room.latestUpdateTime} className={style.timeAgo}/>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }
}
