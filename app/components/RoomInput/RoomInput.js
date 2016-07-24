import React, { PropTypes } from 'react'
import { formatRoomName } from 'helpers/utils'

export default function RoomInput ( props ) {

  const handleSubmit = () => {
    props.initiateSaveRoom(formatRoomName(props.roomName))
  }

  const handleChange = ( e ) => {
    props.updateRoomName( e.target.value )
  }

  return (
    <div>
      <input
        onChange={ handleChange }
        placeholder="Room name" />
      <button
        onClick={ handleSubmit }>
          {'Submit'}
      </button>
    </div>
  )
}

RoomInput.PropTypes = {
  roomName: PropTypes.string.isRequired,
  updateRoomName: PropTypes.func.isRequired,
  initiateSaveRoom: PropTypes.func.isRequired
}
