import React, { PropTypes } from 'react'
import { Link } from 'react-router'
// import { RoomsListContainer } from 'containers'
import style from './styles.css'
import { filterText, formatChat, formatFile } from 'helpers/utils'
import { ChatInputContainer } from 'containers'

export default class ChatsList extends React.Component {

    constructor ( props ) {
        super(props)
    }

    quoteChat = ( chat ) => {
        this.props.chatInputActions.updateQuote(this.props.chatInput.chatText, chat.chatId)
    }

    componentDidUpdate() {
        this.refs.chatListContent.scrollTop = this.refs.chatListContent.scrollHeight;
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

    render () {
        return (
            <div className={style.mainContainer}>
                <div className={style.chatListContainer}>
                    <div className={style.chatContent} ref="chatListContent">
                        {this.props.chats.map(( chat ) => {
                            const id = chat.chatId
                            const type = chat.type
                            return (
                                <ChatContent
                                    key={id}
                                    chat={chat}
                                    quoteChat={this.quoteChat.bind(this)}
                                    getQuote={this.getQuote.bind(this)} />
                            )
                        })}
                    </div>
                </div>
                { this.props.currentRoom && <ChatInputContainer {...this.props} /> }
            </div>
        )
    }
}

const ChatContent = ( props ) => {
    return (
        <div className={style.chatItem}>
            <div className={style.userInfo}>
                <div className={style.userImage}>
                    {/*<img className={style.userImageContent} src={chat.user.avatar} />*/}
                </div>
                <div className={style.userName}>
                    <p>{props.chat.user.name}</p>
                </div>
            </div>
            {(() => {
                if (props.chat.type == 'text') {
                    return (
                        <div className={style.content}>
                            {(() => {
                                if ( props.chat.quote ) {
                                    let quoteContent = props.getQuote( props.chat.quote )
                                    if ( quoteContent.type == 'text' ) {
                                        let text = filterText(quoteContent.content)
                                        return (
                                            <div className={style.mainContent}>
                                                <div className={style.content, style.quoteContent}>
                                                    <p className={style.quoteUser}>{quoteContent.user.name}</p>
                                                    <p>{text}</p>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className={style.mainContent}>
                                                <div className={style.content, style.quoteContent}>
                                                    <a href={quoteContent.url} target="_blank">
                                                        <div className={style.chatImageWrapper}>
                                                            <img className={style.image} src={`${quoteContent.url}`} />
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                            })()}
                            <div className={style.content}>
                                <p>{filterText(props.chat.content)}</p>
                                <div className={style.quote} onClick={() => props.quoteChat(props.chat)}>
                                    <p className={style.quoteText}>Quote user</p>
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className={style.content}>
                            {(() => {
                                if ( props.chat.quote ) {
                                    let quoteContent = props.getQuote( props.chat.quote )
                                    if ( quoteContent.type == 'text' ) {
                                        let text = filterText(quoteContent.content)
                                        return (
                                            <div className={style.mainContent}>
                                                <div className={style.content, style.quoteContent}>
                                                    <p className={style.quoteUser}>{quoteContent.user.name}</p>
                                                    <p>{text}</p>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className={style.mainContent}>
                                                <div className={style.content, style.quoteContent}>
                                                    <a href={quoteContent.url} target="_blank">
                                                        <div className={style.chatImageWrapper}>
                                                            <img className={style.image} src={`${quoteContent.url}`} />
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                            })()}
                            <div className={style.content}>
                                <Link to={props.chat.url} target="_blank">
                                    <div className={style.chatImageWrapper}>
                                        <img className={style.image} src={`${props.chat.url}`} />
                                    </div>
                                </Link>
                                <div className={style.quote} onClick={() => props.quoteChat(props.chat)}>
                                    <p className={style.quoteText}>Quote user</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            })()}
        </div>
    )
}


ChatsList.PropTypes = {
    chats: PropTypes.array.isRequired,
}
