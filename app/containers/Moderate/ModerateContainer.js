import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { ChatInput } from 'components'
import { connect } from 'react-redux'
import { ChatsList } from 'components'

import { setAndHandleChatsListener, updateChats } from 'redux/modules/chatsList'

class ModerateContainer extends React.Component {
  constructor ( props ) {
    super( props )
  }

  componentDidMount () {
    this.props.actions.updateChats()
    this.props.actions.setAndHandleChatsListener(this.props.roomId)
  }

  render () {
    return (
      <div>
        <ChatsList
          user={this.props.user}
          chats={this.props.chats}
          error={this.props.error}
          chatInputActions={this.props.actions.chatInputActions}
          {...this.props} />
      </div>
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( ModerateContainer )
