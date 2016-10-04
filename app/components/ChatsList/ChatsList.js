import React, { PropTypes, Component } from 'react'
// import style, { container, title } from './styles.css'
import { ChatContent } from '../../components'
import _ from 'lodash'

export default class ChatsList extends React.Component  {
    constructor ( props ) {
        super( props )
    }

    componentDidUpdate() {
        this.refs.chatListContent.scrollTop = this.refs.chatListContent.scrollHeight
    }

    quoteChat = ( chat ) => {
        this.props.updateQuote(this.props.chatInput.chatText, chat.chatId)
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
        let show = _.isEmpty( this.props.chats ) ? 'no-show' : 'show'
        let message = _.isEmpty( this.props.chats ) ? <p>No contents to be displayed.</p> : ''
        return (
            <div className="ChatList">
                { message }
                <div className={`chatContent ${ show }`} ref="chatListContent">
                    {this.props.chats.map(( chat ) => {
                        const id = chat.chatId
                        const type = chat.type
                        return (
                            <div key={id}>
                                <ChatContent
                                    chat={chat}
                                    quoteChat={this.quoteChat.bind(this)}
                                    getQuote={this.getQuote.bind(this)}
                                    userType={this.props.user.type}
                                    currentRoom={this.props.currentRoom}
                                    requestDeleteChat={this.props.requestDeleteChat} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
