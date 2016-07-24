import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default function ChatsList ( props ) {
  return (
    <div>
      {props.chats.map((chat) => {
        const id = chat.chatId
        return (
          <div key={id}>
              <p>{chat.chatText}</p>
          </div>
        )
      })}
    </div>
  )
}

ChatsList.PropTypes = {
  chats: PropTypes.array.isRequired,
}
