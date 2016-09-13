import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import style, { container, title } from './styles.css'
import { filterText } from 'helpers/utils'

export default function ChatContent (props) {
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
