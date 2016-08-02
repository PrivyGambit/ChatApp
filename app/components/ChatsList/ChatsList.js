import React, { PropTypes } from 'react'
import { Link } from 'react-router'
// import { RoomsListContainer } from 'containers'
import style from './styles.css'
import { filterText, formatChat, formatFile } from 'helpers/utils'

export default class ChatsList extends React.Component {

  constructor ( props ) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props);
    this.props.actions.updateChats()
    this.props.actions.setAndHandleChatsListener(this.props.roomId)
  }

  quoteChat = ( chat ) => {
    this.props.chatInputActions.updateQuote(this.props.chatInput.chatText, chat.chatId)
  }

  getQuote = ( id ) => {
    let value = {}
    this.props.chats.map((chat)=> {
      if ( chat.chatId == id ) {
        value = chat;
      }
    })
    return value;
  }

  displayContent = ( chat ) => {

  }

  render () {
    return (
      <div>
          <div className={style.chatListContainer}>
            {/*<RoomsListContainer />*/}
            <div className={style.chatContent}>
              {this.props.chats.map(( chat ) => {
                const id = chat.chatId
                const type = chat.type
                return (
                  <div key={id} className={style.chatItem}>
                    <div className={style.userInfo}>
                      <div className={style.userImage}>
                        {/*<img className={style.userImageContent} src={chat.user.avatar} />*/}
                      </div>
                      <div className={style.userName}>
                        <p>{chat.user.name}</p>
                      </div>
                    </div>
                    {(() => {
                      if ( chat.quote ) {
                        let quoteContent = this.getQuote( chat.quote )
                        if ( type == 'text' ) {
                          let text = filterText(quoteContent.content)
                          return (
                            <div className={style.mainContent}>
                              <div className={style.content, style.quoteContent}>
                                <p className={style.quoteUser}>{quoteContent.user.name}</p>
                                <p>{text}</p>
                              </div>
                              <div className={style.content}>
                                <p>{filterText(chat.content)}</p>
                              </div>
                            </div>
                          )
                        } else {
                          return (
                            <div className={style.mainContent}>
                              <div className={style.content}>
                                <Link to={quoteContent.url} target="_blank">
                                  <div className={style.chatImageWrapper}>
                                    <img className={style.image} src={`${quoteContent.url}`} />
                                  </div>
                                </Link>
                              </div>
                              <div className={style.content}>
                                <Link to={chat.url} target="_blank">
                                  <div className={style.chatImageWrapper}>
                                    <img className={style.image} src={`${chat.url}`} />
                                  </div>
                                </Link>
                              </div>
                            </div>
                          )
                        }
                      }
                      if ( type == 'text' ) {
                        let text = filterText(chat.content)
                        return (
                          <div className={style.content}>
                            <p>{text}</p>
                            <div className={style.quote} onClick={() => this.quoteChat(chat)}>
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
                            <div className={style.quote} onClick={() => this.quoteChat(chat)}>
                               <p className={style.quoteText}>Quote user</p>
                            </div>
                          </div>
                        )
                      }
                    })()}
                  </div>
                )
              })}
            </div>
          </div>
          <ChatInput {...this.props}/>
      </div>
    )
  }
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
    this.props.chatInputActions.initiateSaveChat(formatChat(chat), this.props.roomId, this.props.chatInput.quote)
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
      this.props.chatInputActions.initiateUploadFile(image, formatFile(chat), this.props.roomId, this.props.chatInput.quote)
    }
  }
  render () {
      return (
        <div className={style.inputWrapper}>
          <div className={style.quoteWrapper}>
            <span className={style.quoteIndicator}>quoted: {this.props.chatInput.quote}</span>
          </div>
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
