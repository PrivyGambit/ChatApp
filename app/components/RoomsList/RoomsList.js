import React, { PropTypes } from 'react'
import { formatRoomName } from 'helpers/utils'
import { Link } from 'react-router'
import style from './styles.css'
import classNames from 'classnames'


export default class RoomsList extends React.Component {

  constructor ( props ) {
    super ( props )
    this.state = { isPressed: false }
  }

  handleToggle () {
    this.setState({ isPressed: !this.state.isPressed })
    console.log(this.state.isPressed);
  }

  render () {
    var btnToggle = classNames({
      'btnPressed': this.state.isPressed
    })
    return (
      <div className={style.wrapper}>
        <button
          className={`${style.toggle} btn btn-default`}
          onClick={this.handleToggle.bind(this)} >
          Rooms
          <span className={`${style.arrow} caret`}></span>
        </button>
        <ul className={`${style.list} ${btnToggle} ${style.btnPressed} `}>
          {this.props.rooms.map((room) => {
            const id = room.roomId
            return (
              <li key={id}>
                <Link to={`rooms/${id}`}>
                  <p>{room.roomName}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

RoomsList.PropTypes = {
  rooms: PropTypes.array.isRequired,
}
