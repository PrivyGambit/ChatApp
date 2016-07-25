import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { RoomsListContainer } from 'containers'

export default function ChatsList ( props ) {
  return (
    <div>
      <RoomsListContainer />
      <div>
        {props.chats.map(( chat ) => {
          const id = chat.chatId
          return (
            <div key={id}>
                <p>{chat.chatText}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

ChatsList.PropTypes = {
  chats: PropTypes.array.isRequired,
}
