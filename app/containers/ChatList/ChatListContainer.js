import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { ChatsList } from 'components'
import { connect } from 'react-redux'


import { setAndHandleChatsListener, updateChats } from 'redux/modules/chatsList'
import * as inputActionCreators from 'redux/modules/chatInput'

class ChatsListContainer extends React.Component {
  constructor ( props ) {
    super( props )
  }

  componentDidMount () {
    this.props.actions.updateChats()
    this.props.actions.setAndHandleChatsListener(this.props.roomId)
  }

  componentWillReceiveProps () {
    // this.props.updateChats()
    // this.props.setAndHandleChatsListener(this.props.roomId)
  }

  render () {
    return (
      <ChatsList
        user={this.props.user}
        chats={this.props.chats}
        error={this.props.error}
        chatInputActions={this.props.actions.chatInputActions}
        {...this.props} />
    )
  }
}

const mapStateToProps = ({users, chatsList, chatInput}) => {
  const rms = chatsList.chats
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    isFetching: chatsList.isFetching,
    error: chatsList.error,
    chats: Object.keys(rms).map((id) => rms[id]),
    chatInput: {
      chatText: chatInput.chatText,
      quote: chatInput.quote
    },
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    actions: {
        setAndHandleChatsListener: ( params ) => dispatch(setAndHandleChatsListener( params )),
        updateChats: () => dispatch(updateChats()),
        chatInputActions: bindActionCreators(inputActionCreators, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( ChatsListContainer )
