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
    <div>
      <input
        onChange={ handleChange }
        placeholder="Type a message" />
      <button
        onClick={ handleSubmit }>
          {'Submit'}
      </button>
    </div>
  )
}

ChatInput.PropTypes = {
  roomId: PropTypes.string.isRequired,
  chatText: PropTypes.string.isRequired,
  updateChatText: PropTypes.func.isRequired,
  initiateSaveChat: PropTypes.func.isRequired
}
