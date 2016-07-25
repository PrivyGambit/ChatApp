import React, { PropTypes } from 'react'
import { formatRoomName } from 'helpers/utils'

export default function ChatInput ( props ) {

  const handleSubmit = () => {
    props.initiateSaveChat(props.chatText, props.roomId)
  }

  const handleChange = ( e ) => {
    props.updateChatText( e.target.value )
  }

  return (
    <div className="input-group">
      <input
        className="form-control"
        type="text"
        onChange={ handleChange }
        placeholder="Type a message" />
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

ChatInput.PropTypes = {
  roomId: PropTypes.string.isRequired,
  chatText: PropTypes.string.isRequired,
  updateChatText: PropTypes.func.isRequired,
  initiateSaveChat: PropTypes.func.isRequired
}
