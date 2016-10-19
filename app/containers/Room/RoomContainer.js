import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ChatsList, SearchRoom, Spinner } from '../../components'
import { ChatInputContainer, RoomsListContainer, ChatListContainer } from '../../containers'
import { setAndHandleRoomsListener } from '../../redux/modules/rooms'
import { setAndHandleChatsListener, updateChats, removeChatsListener, searchChat } from '../../redux/modules/chatsList'
import { handleLoadNewChats, handleSearchChats } from '../../redux/modules/chatsList'
import { updateQuote } from '../../redux/modules/chatInput'
import _ from 'lodash'

class RoomContainer extends Component {

    constructor ( props, context ) {
        super ( props )
        context.router
    }

    componentDidMount () {}

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

        let show = _.isEmpty( this.props.chats ) ? 'no-show' : 'show'
        return (
            <div className="container">
                <RoomsListContainer
                    user={this.props.user}
                    error={this.props.error.rooms} />
                <div className="mainContainer">
                    <div className="chatListContainer">
                        <div className={`input-group searchInput ${ show }`}>
                            <input
                                className='form-control'
                                onChange={this.doSearchChat.bind( this, this.props.currentRoom )}
                                type='text'
                                placeholder='Enter search keyword' />
                        </div>
                        {/*<p className="load-more"
                            onClick={this.loadNewChats.bind( this, this.props.currentRoom )}>load older messages</p>*/}
                            <ChatListContainer routeParams={ this.props.params.roomId }/>
                    </div>
                    { this.props.currentRoom
                        && <ChatInputContainer
                            currentRoom={this.props.currentRoom}
                            user={this.props.user} />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({users, chatsList, chatInput, rooms}, { routeParams }) => {
    const cts = chatsList.chats
    const rms = rooms.rooms
    return {
        user: users[users.authedId] ? users[users.authedId].info : {},
        error: {
            chatsList: chatsList.error,
            rooms: rooms.error,
        },
        chats: Object.keys(cts).map((id) => cts[id]),
        currentRoom: chatsList.roomId,
        chatInput: chatInput
    }
}

const mapDispatchToProps = ( dispatch, { routeParams } ) => {
    return {
        actions: {
            handleSearchChats: ( roomId, query ) => dispatch( handleSearchChats( roomId, query ) ),
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)( RoomContainer )
