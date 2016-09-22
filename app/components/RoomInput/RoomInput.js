import React, { PropTypes } from 'react'
import { formatRoomName } from '../../helpers/utils'

export default function RoomInput ( props ) {

    const handleSubmit = () => {
        props.initiateSaveRoom(formatRoomName(props.roomName))
    }

    const handleChange = ( e ) => {
        props.updateRoomName( e.target.value )
    }

    return (
        <div className="input-group">
            <input
                className="form-control"
                type="text"
                onChange={ handleChange }
                placeholder="Enter Room name" />
            <span className="input-group-btn">
                <button
                    className="btn btn-default"
                    type="button"
                    onClick={ handleSubmit }>
                    {'Submit'}
                </button>
            </span>
        </div>
    )
}

RoomInput.PropTypes = {
    roomName: PropTypes.string.isRequired,
    updateRoomName: PropTypes.func.isRequired,
    initiateSaveRoom: PropTypes.func.isRequired
}
