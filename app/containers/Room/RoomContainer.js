import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ChatInputContainer, ChatListContainer, RoomsListContainer } from 'containers'
import { ChatsList, RoomsList } from 'components'


import { setAndHandleChatsListener, updateChats } from 'redux/modules/chatsList'
import * as inputActionCreators from 'redux/modules/chatInput'
import * as roomsActionCreators from 'redux/modules/rooms'
import { setAndHandleRoomsListener } from 'redux/modules/rooms'

class RoomContainer extends React.Component {

  constructor ( props ) {
    super ( props )
  }

  componentDidMount () {
    this.props.actions.setAndHandleRoomsListener()
  }

  handleChangeRoom (props) {
    // console.log('test');
    // this.props.actions.updateChats()
    // this.props.actions.setAndHandleChatsListener(this.props.roomId)
  }

  render () {
    return (
      <div>
        <RoomsList
            user={this.props.user}
            rooms={this.props.rooms}
            handleChangeRoom={this.handleChangeRoom}
            error={this.props.error.rooms}
            {...this.props} />
        <ChatsList
            user={this.props.user}
            chats={this.props.chats}
            error={this.props.error.chatsList}
            chatInputActions={this.props.actions.chatInputActions}
            roomId={this.props.params.roomId}
            {...this.props} />
        {/*<ChatInputContainer roomId={this.props.params.roomId} />*/}
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
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    actions: {
        setAndHandleRoomsListener: () => dispatch(setAndHandleRoomsListener()),
        setAndHandleChatsListener: ( params ) => dispatch(setAndHandleChatsListener( params )),
        updateChats: () => dispatch(updateChats()),
        chatInputActions: bindActionCreators(inputActionCreators, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( RoomContainer )
