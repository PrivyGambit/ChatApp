import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ChatsList, SearchRoom, Spinner } from '../../components'
import { ChatInputContainer, RoomsListContainer, RoomInputContainer } from '../../containers'
// import style from './styles.css'

import { setAndHandleRoomsListener } from '../../redux/modules/rooms'
import { handleLoadNewChats, handleSearchChats } from '../../redux/modules/chatsList'

class RoomContainer extends Component {

    constructor ( props ) {
        super ( props )
    }

    componentDidMount () {
        this.props.actions.setAndHandleRoomsListener()
    }

    doSearchChat = ( roomId, e ) => {
        this.props.actions.handleSearchChats( roomId, e.target.value )
    }

    loadNewChats = ( roomId ) => {
        this.props.actions.handleLoadNewChats( roomId )
    }

    render () {
        // if (this.props.isFetching === true) {
        //     return (<Spinner />)
        // }
        return (
            <div className="container">
                <RoomInputContainer />
                <RoomsListContainer
                    user={this.props.user}
                    error={this.props.error.rooms} />
                <div className="mainContainer">
                    <div className="chatListContainer">
                        <div className="input-group searchInput">
                            <input
                                className='form-control'
                                onChange={this.doSearchChat.bind( this, this.props.currentRoom )}
                                type='text'
                                placeholder='Enter search keyword' />
                        </div>
                        {/*<p className="load-more"
                            onClick={this.loadNewChats.bind( this, this.props.currentRoom )}>load older messages</p>*/}
                        <ChatsList
                            currentRoom={this.props.currentRoom}
                            handleLoadNewChats={ this.props.actions.handleLoadNewChats }
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
            handleLoadNewChats: ( roomId ) => dispatch( handleLoadNewChats( roomId ) ),
            handleSearchChats: ( roomId, query ) => dispatch( handleSearchChats( roomId, query ) )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)( RoomContainer )
