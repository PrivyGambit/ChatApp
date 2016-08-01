import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { RoomsListContainer } from 'containers'
import style from './styles.css'
import { filterText, formatChat, formatFile } from 'helpers/utils'

export default function ChatsList ( props ) {
  const quoteChat = ( chat ) => {
    props.chatInputActions.updateQuote(props.chatInput.chatText, chat.chatId)
  }
  return (
    <div>
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
                          <div className={style.quote} onClick={() => quoteChat(chat)}>
                             <p className={style.quoteText}>Quote user</p>
                          </div>
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
        <ChatInput {...props}/>
    </div>
  )
}

class ChatInput extends React.Component {
  constructor ( props ) {
    super(props)
    const allowedFileTypes = ['jpeg', 'jpg', 'png', 'gif']
  }

  handleSubmit = () => {
    let chat = {
      type: 'text',
      text: this.props.chatInput.chatText,
      user: this.props.user.name,
      avatar: this.props.user.avatar
    }
    this.props.chatInputActions.initiateSaveChat(formatChat(chat), this.props.roomId)
  }

  handleChange = ( e ) => {
    this.props.chatInputActions.updateChatText( e.target.value, this.props.chatInput.quote )
    console.log(this.props);
  }

  handleUpload = ( e ) => {
    let image = e.target.files[0];
    if ( !image.type.match('image.*') ) {
      let error = {
        message: 'File type not allowed.'
      }
      return false
    } else {
      let chat = {
        type: 'image',
        user: this.props.user.name,
        avatar: this.props.user.avatar
      }
      this.props.chatInputActions.initiateUploadFile(image, formatFile(chat), this.props.roomId)
    }
  }
  render () {
      return (
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            onChange={ this.handleChange.bind(this) }
            placeholder="Type a message" />
          <span className="input-group-btn">
            <label className="btn btn-default btn-file">
              <span className="glyphicon glyphicon-upload"></span>
              <input
                type="file"
                className={`btn btn-default ${style.noDisplay}`}
                onChange={ this.handleUpload.bind(this) }/>
            </label>
              <button
                className="btn btn-default"
                type="button"
                onClick={ this.handleSubmit.bind(this) }>
                {'Submit'}
              </button>
          </span>
        </div>
      )
  }
}

ChatInput.PropTypes = {
  roomId: PropTypes.string.isRequired,
  chatText: PropTypes.string.isRequired,
  updateChatText: PropTypes.func.isRequired,
  initiateSaveChat: PropTypes.func.isRequired
}

ChatsList.PropTypes = {
  chats: PropTypes.array.isRequired,
}
