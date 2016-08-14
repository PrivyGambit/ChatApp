import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ChatsList, RoomsList } from 'components'

import { setAndHandleChatsListener, updateChats, removeChatsListener, searchChat } from 'redux/modules/chatsList'
import * as inputActionCreators from 'redux/modules/chatInput'
import * as roomsActionCreators from 'redux/modules/rooms'
import { setAndHandleRoomsListener } from 'redux/modules/rooms'

class RoomContainer extends Component {

    constructor ( props ) {
        super ( props )
    }

    componentDidMount () {
        this.props.actions.setAndHandleRoomsListener()
    }

    render () {
        return (
            <div>
                <RoomsList
                    user={this.props.user}
                    rooms={this.props.rooms}
                    error={this.props.error.rooms}
                    {...this.props} />
                <ChatsList
                    user={this.props.user}
                    chats={this.props.chats}
                    error={this.props.error.chatsList}
                    chatInputActions={this.props.actions.chatInputActions}
                    {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = ({users, chatsList, chatInput, rooms}) => {
    const cts = chatsList.chats
    const rms = rooms.rooms
    return {
        user: users[users.authedId] ? users[users.authedId].info : {},
        isFetching: chatsList.isFetching,
        error: {
            chatsList: chatsList.error,
            rooms: rooms.error,
        },
        chats: Object.keys(cts).map((id) => cts[id]),
        rooms: Object.keys(rms).map((id) => rms[id]),
        chatInput: {
            chatText: chatInput.chatText,
            quote: chatInput.quote
        },
        currentRoom: chatsList.roomId
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        actions: {
            setAndHandleRoomsListener: () => dispatch(setAndHandleRoomsListener()),
            setAndHandleChatsListener: ( params ) => dispatch(setAndHandleChatsListener( params )),
            updateChats: () => dispatch(updateChats()),
            chatInputActions: bindActionCreators(inputActionCreators, dispatch),
            removeChatsListener: (id) => dispatch(removeChatsListener(id)),
            searchChat: (params) => dispatch(searchChat(params))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)( RoomContainer )
