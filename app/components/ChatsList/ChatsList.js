import React, { PropTypes } from 'react'
import { Link } from 'react-router'
// import { RoomsListContainer } from 'containers'
import style from './styles.css'
import { filterText, formatChat, formatFile } from 'helpers/utils'
import { ChatInputContainer } from 'containers'

export default class ChatsList extends React.Component {

    constructor ( props ) {
        super(props)
        this.state = {
            query: '',
            filteredData: this.props.chats
        }
    }

    quoteChat = ( chat ) => {
        this.props.chatInputActions.updateQuote(this.props.chatInput.chatText, chat.chatId)
    }

    componentDidUpdate() {
        this.refs.chatListContent.scrollTop = this.refs.chatListContent.scrollHeight;
    }

    componentWillReceiveProps () {
        this.setState({
            filteredData: this.props.chats
        })
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

    doSearch ( queryText ) {
        let queryResult = []
        this.props.chats.map(( rm ) => {
            if ( rm.content.toLocaleLowerCase().indexOf(queryText) !=-1 )
                queryResult.push(rm)
            this.setState({
                query: queryText,
                filteredData: queryResult
            })
        })
    }

    render () {
        return (
            <div className={style.mainContainer}>
                <div className={style.chatListContainer}>
                    { this.props.user.type == 'moderate' ?  <SearchBox query={this.state.query} doSearch={this.doSearch.bind(this)} /> : '' }
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
                </div>
                { this.props.currentRoom && <ChatInputContainer {...this.props} /> }
            </div>
        )
    }
}

class SearchBox extends React.Component {
    constructor ( props ) {
        super( props )
    }

    doSearch ( e ) {
        this.props.doSearch(e.target.value)
    }

    render () {
        return (
            <div className={`input-group ${style.searchInput}`}>
                <input
                    className='form-control'
                    value={this.props.query}
                    onChange={this.doSearch.bind( this )}
                    type='text'
                    placeholder='Enter search keyword' />
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
                    <p>{props.chat.user.name ? props.chat.user.name : 'User error'}</p>
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
                                        return (
                                            <div className={style.mainContent}>
                                                <div className={style.content, style.quoteContent}>
                                                    <p className={style.quoteUser}>{quoteContent.user.name}</p>
                                                    <p>{filterText(quoteContent.content)}</p>
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
                                {props.userType == 'moderate'
                                    ? <p className="">{props.chat.content}</p>
                                    : <p>{filterText(props.chat.content)}</p>
                                }
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
                                        return (
                                            <div className={style.mainContent}>
                                                <div className={style.content, style.quoteContent}>
                                                    <p className={style.quoteUser}>{quoteContent.user.name}</p>
                                                    <p>{filterText(quoteContent.content)}</p>
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
