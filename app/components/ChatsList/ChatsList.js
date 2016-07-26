import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { RoomsListContainer } from 'containers'
import style from './styles.css'

export default function ChatsList ( props ) {
  return (
    <div className={style.chatListContainer}>
      <RoomsListContainer />
      <div className={style.chatContent}>
        {props.chats.map(( chat ) => {
          const id = chat.chatId
          const type = chat.type
          if ( type == 'text' ) {
            return (
              <div key={id}>
                  <p>{chat.content}</p>
              </div>
            )
          } else {
            return (
              <div key={id}>
                <img className={style.image} src={`${chat.url}`} />
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

ChatsList.PropTypes = {
  chats: PropTypes.array.isRequired,
}
