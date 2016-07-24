import React, { PropTypes } from 'react'
import { formatRoomName } from 'helpers/utils'
import { Link } from 'react-router'

export default function Rooms ( props ) {
  return (
    <div>
      {props.rooms.map((room) => {
        const id = room.roomId
        return (
          <div key={id}>
            <Link to={`rooms/${id}`}>
              <p>{room.roomName}</p>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

Rooms.PropTypes = {
  rooms: PropTypes.array.isRequired,
}
