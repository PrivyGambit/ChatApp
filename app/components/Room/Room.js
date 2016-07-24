import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { formatRoomName } from 'helpers/utils'

export default function RoomsList ( props ) {
  return (
    <div>
      {props.rooms.map((room) => {
        const id = room.roomId
        return (
          <div key={id}>
            <Link to=`room/${room.roomId}`/>
            <p>{room.roomName}</p>
          </div>
        )
      })}
    </div>
  )
}

RoomsList.PropTypes = {
  rooms: PropTypes.array.isRequired,
  roomInputActions: PropTypes.object.isRequired
}
