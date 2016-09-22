import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ChatsList, SearchRoom } from '../../components'
import { ChatInputContainer, RoomsListContainer } from '../../containers'
// import style from './styles.css'

// import { setAndHandleChatsListener, updateChats, removeChatsListener, searchChat } from 'redux/modules/chatsList'
// import * as roomsActionCreators from 'redux/modules/rooms'
import { setAndHandleRoomsListener } from '../../redux/modules/rooms'

class RoomContainer extends Component {

    constructor ( props ) {
        super ( props )
    }

    componentDidMount () {
        this.props.actions.setAndHandleRoomsListener()
    }

    render () {
        return (
            <div className="container">
                <RoomsListContainer
                    user={this.props.user}
                    error={this.props.error.rooms} />
                <div className="mainContainer">
                    <div className="chatListContainer">
                        <ChatsList
                            chats={this.props.chats}
                            user={this.props.user} />
                    </div>
                    { this.props.currentRoom
                        && <ChatInputContainer
                        currentRoom={this.props.currentRoom} user={this.props.user} />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({users, chatsList, chatInput, rooms}) => {
    const cts = chatsList.chats
    const rms = rooms.rooms
    return {
        user: users[users.authedId] ? users[users.authedId].info : {},
        // isFetching: chatsList.isFetching,
        error: {
            chatsList: chatsList.error,
            rooms: rooms.error,
        },
        chats: Object.keys(cts).map((id) => cts[id]),
        currentRoom: chatsList.roomId
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        actions: {
            setAndHandleRoomsListener: () => dispatch(setAndHandleRoomsListener()),
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)( RoomContainer )
