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
          return (
            <div key={id} className={style.chatItem}>
              <div className={style.userInfo}>
                <div className={style.userImage}>
                  <img className={style.userImageContent} src={chat.user.avatar}/>
                </div>
                <div className={style.userName}>
                  <p>{chat.user.name}</p>
                </div>
              </div>
              {(() => {
                if ( type == 'text' ) {
                  return (
                    <div className={style.content}>
                      <p>{chat.content}</p>
                    </div>
                  )
                } else {
                  return (
                    <div className={style.content}>
                      <img className={style.image} src={`${chat.url}`} />
                    </div>
                  )
                }
              })()}
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
