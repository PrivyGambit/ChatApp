import React, { PropTypes, Component } from 'react'
import style, { container, title } from './styles.css'
import { ChatContent } from 'components'

export default class ChatsList extends React.Component  {
    constructor ( props ) {
        super( props )
    }

    componentDidUpdate() {
        this.refs.chatListContent.scrollTop = this.refs.chatListContent.scrollHeight
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

    render () {
        return (
            <div className={style.chatContent} ref="chatListContent">
                {this.props.chats.map(( chat ) => {
                    const id = chat.chatId
                    const type = chat.type
                    return (
                        <ChatContent
                            key={id}
                            chat={chat}
                            quoteChat={this.quoteChat.bind(this)}
                            getQuote={this.getQuote.bind(this)}
                            userType={this.props.user.type} />
                    )
                })}
            </div>
        )
    }
}
