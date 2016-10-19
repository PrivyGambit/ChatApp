import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ChatsList, SearchRoom, Spinner } from '../../components'
import { setAndHandleRoomsListener } from '../../redux/modules/rooms'
import { setAndHandleChatsListener, updateChats, removeChatsListener, searchChat } from '../../redux/modules/chatsList'
import { handleLoadNewChats, handleSearchChats } from '../../redux/modules/chatsList'
import { updateQuote } from '../../redux/modules/chatInput'
import _ from 'lodash'

class ChatListContainer extends Component {

    constructor ( props, context ) {
        super ( props )
        context.router
    }

    componentDidMount () {
        this.props.actions.setAndHandleRoomsListener()
        if ( !_.isEmpty( this.props.routeParams ) ) {
            this.props.actions.removeChatsListener( this.props.routeParams )
            this.props.actions.setAndHandleChatsListener( this.props.routeParams )
        }
    }

    componentDidUpdate () {
        // this.props.actions.setAndHandleRoomsListener()
        // if ( !_.isEmpty( this.props.routeParams ) ) {
        //     this.props.actions.removeChatsListener( this.props.routeParams )
        //     this.props.actions.setAndHandleChatsListener( this.props.routeParams )
        // }
    }

    render () {
        return (
            <ChatsList
                currentRoom={this.props.currentRoom}
                handleLoadNewChats={ this.props.actions.handleLoadNewChats }
                chats={this.props.chats}
                user={this.props.user}
                chatInput={this.props.chatInput}
                updateQuote={this.props.actions.updateQuote} />
        )
    }

}

const mapStateToProps = ({users, chatsList, chatInput}) => {
    const cts = chatsList.chats
    return {
        user: users[users.authedId] ? users[users.authedId].info : {},
        chats: Object.keys(cts).map((id) => cts[id]),
        currentRoom: chatsList.roomId,
        chatInput: chatInput
    }
}


const mapDispatchToProps = ( dispatch ) => {
    // return bindActionCreators(userActionCreators, dispatch)
    return {
        actions: {
            setAndHandleRoomsListener: () => dispatch(setAndHandleRoomsListener()),
            handleLoadNewChats: ( roomId ) => dispatch( handleLoadNewChats( roomId ) ),
            handleSearchChats: ( roomId, query ) => dispatch( handleSearchChats( roomId, query ) ),
            updateQuote: ( chatText, chatId ) => dispatch( updateQuote( chatText, chatId ) ),
            setAndHandleChatsListener : (roomId) => dispatch( setAndHandleChatsListener( roomId ) ),
            removeChatsListener: (roomId) => dispatch ( removeChatsListener( roomId ) )
        }
    }
}

export default connect (
    mapStateToProps,
    mapDispatchToProps,
)( ChatListContainer )
