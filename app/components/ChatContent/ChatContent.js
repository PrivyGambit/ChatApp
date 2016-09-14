import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import style, { container, title } from './styles.css'
import { filterText } from 'helpers/utils'

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
            <div className={style.chatItem} onMouseEnter={ this.handleMouseEnter.bind( this ) } onMouseLeave={ this.handleMouseEnter.bind( this ) }>
                <div className={style.userInfo}>
                    <div className={style.userImage}>
                        {/*<img className={style.userImageContent} src={chat.user.avatar} />*/}
                    </div>
                    <div className={style.userName}>
                        <p>{this.props.chat.user.name ? this.props.chat.user.name : 'User error'}</p>
                    </div>
                </div>
                {(() => {
                    if (this.props.chat.type == 'text') {
                        return (
                            <div className={style.content}>
                                {(() => {
                                    if ( this.props.chat.quote ) {
                                        let quoteContent = this.props.getQuote( this.props.chat.quote )
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
                                    {this.props.userType == 'moderate'
                                        ? <p className="">{this.props.chat.content}</p>
                                        : <p>{filterText(this.props.chat.content)}</p>
                                    }
                                    <div className={style.quote} onClick={() => this.props.quoteChat(this.props.chat)}>
                                        <p className={style.quoteText}>Quote user</p>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className={style.content}>
                                {(() => {
                                    if ( this.props.chat.quote ) {
                                        let quoteContent = this.props.getQuote( this.props.chat.quote )
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
                                    <Link to={this.props.chat.url} target="_blank">
                                        <div className={style.chatImageWrapper}>
                                            <img className={style.image} src={`${this.props.chat.url}`} />
                                        </div>
                                    </Link>
                                    <div className={style.quote} onClick={() => this.props.quoteChat(this.props.chat)}>
                                        <p className={style.quoteText}>Quote user</p>
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
