import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { ChatInput } from '../../components'
import { connect } from 'react-redux'
import { ChatsList, Top, UserList, Spinner } from '../../components'
import { ChatInputContainer, RoomsListContainer, RoomInputContainer } from '../../containers'
import _ from 'lodash'

import { setAndHandleChatsListener, updateChats, requestDeleteChat } from '../../redux/modules/chatsList'
import { setAndHandleRoomsListener } from '../../redux/modules/rooms'
import { fetchUserList, callBanUser, callUnbanUser, handleSearchUser } from '../../redux/modules/userlist'

export default class ModerateContainer extends React.Component {

    constructor ( props, context ) {
        super( props )
    }

    componentDidMount () {
        this.props.actions.updateChats()
        // this.props.actions.setAndHandleChatsListener(this.props.roomId)
        this.props.actions.setAndHandleRoomsListener()
        this.props.actions.fetchUserList()
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

    doSearchChat = ( e ) => {
        this.props.actions.handleSearchUser( e.target.value )
    }

    render () {
        // if ( !_.isEmpty( this.props.chats ) ) {
        //     this.props.chats.sort(function ( a, b ) {
        //         if ( a.announcement == true ) {
        //             return 1
        //         }
        //         return 0
        //     })
        // }
        let show = _.isEmpty( this.props.chats ) ? 'no-show' : 'show'

        if ( this.props.isFetching.userList == true ) {
            return (
                    <Spinner />
            )
        }
        return (
            <div className="Moderate">
                <RoomInputContainer />
                <RoomsListContainer
                    user={this.props.user}
                    error={this.props.error} />
                <div className="mainContainer">
                    <div className="chatListContainer">
                        <div className={`input-group searchInput ${ show }`}>
                            <input
                                className='form-control'
                                onChange={this.doSearchChat.bind( this, this.props.currentRoom )}
                                type='text'
                                placeholder='Enter search keyword' />
                        </div>
                        <ChatsList
                            chats={this.props.chats}
                            user={this.props.user}
                            currentRoom={this.props.currentRoom}
                            requestDeleteChat={this.props.actions.requestDeleteChat} />
                    </div>
                    { this.props.currentRoom
                        && <ChatInputContainer
                        currentRoom={this.props.currentRoom} user={this.props.user} />
                    }
                </div>
                <input
                    className='form-control'
                    onChange={this.doSearchChat.bind( this )}
                    type='text'
                    placeholder='Enter search keyword' />
                <UserList
                    userlist={this.props.userlist}
                    banUser={this.props.actions.banUser}
                    unBanUser={this.props.actions.unBanUser}/>
            </div>
        )
    }
}

const mapStateToProps = ({users, chatsList, chatInput, userlist}) => {
    const rms = chatsList.chats
    const ulist = userlist.userlist

    return {
        user: users[users.authedId] ? users[users.authedId].info : {},
        isFetching: {
            chatList: chatsList.isFetching,
            userList: userlist.isFetching
        },
        error: {
            chatsList: chatsList.error,
            userlist: userlist.error
        },
        chats: Object.keys(rms).map((id) => rms[id]),
        // chats: rms.
        chatInput: {
            chatText: chatInput.chatText,
            quote: chatInput.quote
        },
        currentRoom: chatsList.roomId,
        userlist: Object.keys(ulist).map((id) => ulist[id])
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        actions: {
            setAndHandleChatsListener: ( params ) => dispatch(setAndHandleChatsListener( params )),
            updateChats: () => dispatch(updateChats()),
            setAndHandleRoomsListener: () => dispatch(setAndHandleRoomsListener()),
            requestDeleteChat: (roomId, chatId) => dispatch(requestDeleteChat( roomId, chatId )),
            fetchUserList: () => dispatch(fetchUserList()),
            banUser: (uid) => dispatch(callBanUser(uid)),
            unBanUser: (uid) => dispatch(callUnbanUser(uid)),
            handleSearchUser: ( query ) => dispatch( handleSearchUser( query ) )
        }
    }
}

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps,
)( ModerateContainer )
