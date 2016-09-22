import React, { PropTypes } from 'react'
import { Link } from 'react-router'
// import style, { container, title } from './styles.css'
import { filterText } from '../../helpers/utils'

export default class ChatContent extends React.Component {

    constructor (props) {
        super( props )
        this.state = {
            showOptions: false
        }
    }

    handleMouseEnter () {
        this.setState({
            showOptions: !this.state.showOptions
        })
    }

    handleDelete ( chatId ) {
        this.props.requestDeleteChat(this.props.currentRoom, chatId)
    }

    render () {
        return (
            <div className='chatItem' onMouseEnter={ this.handleMouseEnter.bind( this ) } onMouseLeave={ this.handleMouseEnter.bind( this ) }>
                <div className='userInfo'>
                    <div className='userImage'>
                        {/*<img className={style.userImageContent} src={chat.user.avatar} />*/}
                    </div>
                    <div className='userName'>
                        <p>{this.props.chat.user.name ? this.props.chat.user.name : 'User error'}</p>
                    </div>
                </div>
                {(() => {
                    if (this.props.chat.type == 'text') {
                        return (
                            <div className='content'>
                                {(() => {
                                    if ( this.props.chat.quote ) {
                                        let quoteContent = this.props.getQuote( this.props.chat.quote )
                                        if ( quoteContent.type == 'text' ) {
                                            return (
                                                <div className='mainContent'>
                                                    <div className='content quoteContent'>
                                                        <p className='quoteUser'>{quoteContent.user.name}</p>
                                                        <p>{filterText(quoteContent.content)}</p>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className='mainContent'>
                                                    <div className='content quoteContent'>
                                                        <a href={quoteContent.url} target="_blank">
                                                            <div className='chatImageWrapper'>
                                                                <img className='image' src={`${quoteContent.url}`} />
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                })()}
                                <div className='content'>
                                    {this.props.userType == 'moderate'
                                        ? <p className="">{this.props.chat.content}</p>
                                        : <p>{filterText(this.props.chat.content)}</p>
                                    }
                                    <div className='quote' onClick={() => this.props.quoteChat(this.props.chat)}>
                                        <p className='quoteText'>Quote user</p>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className='content'>
                                {(() => {
                                    if ( this.props.chat.quote ) {
                                        let quoteContent = this.props.getQuote( this.props.chat.quote )
                                        if ( quoteContent.type == 'text' ) {
                                            return (
                                                <div className='mainContent'>
                                                    <div className='content quoteContent'>
                                                        <p className='quoteUser'>{quoteContent.user.name}</p>
                                                        <p>{filterText(quoteContent.content)}</p>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className='mainContent'>
                                                    <div className='content quoteContent'>
                                                        <a href={quoteContent.url} target="_blank">
                                                            <div className='chatImageWrapper'>
                                                                <img className='image' src={`${quoteContent.url}`} />
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                })()}
                                <div className='content'>
                                    <Link to={this.props.chat.url} target="_blank">
                                        <div className='chatImageWrapper'>
                                            <img className='image' src={`${this.props.chat.url}`} />
                                        </div>
                                    </Link>
                                    <div className='quote' onClick={() => this.props.quoteChat(this.props.chat)}>
                                        <p className='quoteText'>Quote user</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })()}
                {this.state.showOptions && this.props.userType == 'moderate' ? <button onClick={this.handleDelete.bind( this, this.props.chat.chatId )} type="button" className="btn btn-danger">Delete</button> : ''}
            </div>
        )
    }
}
