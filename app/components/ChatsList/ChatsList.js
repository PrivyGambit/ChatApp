import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { RoomsListContainer } from 'containers'
import style from './styles.css'
import { filterText } from 'helpers/utils'

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
                  <img className={style.userImageContent} src={chat.user.avatar} />
                </div>
                <div className={style.userName}>
                  <p>{chat.user.name}</p>
                </div>
              </div>
              {(() => {
                if ( type == 'text' ) {
                  let text = filterText(chat.content)
                  return (
                    <div className={style.content}>
                      <p>{text}</p>
                    </div>
                  )
                } else {
                  return (
                    <div className={style.content}>
                      <Link to={chat.url} target="_blank">
                        <div className={style.chatImageWrapper}>
                          <img className={style.image} src={`${chat.url}`} />
                        </div>
                      </Link>
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
