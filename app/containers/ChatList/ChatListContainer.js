import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { ChatsList } from 'components'
import { connect } from 'react-redux'
import { setAndHandleChatsListener, updateChats } from 'redux/modules/chatsList'

class ChatsListContainer extends React.Component {
  constructor ( props ) {
    super( props )
  }

  componentDidMount () {
    this.props.updateChats()
    this.props.setAndHandleChatsListener(this.props.roomId)
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
        error={this.props.error} />
    )
  }
}

const mapStateToProps = ({users, chatsList}) => {
  const rms = chatsList.chats
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    isFetching: chatsList.isFetching,
    error: chatsList.error,
    chats: Object.keys(rms).map((id) => rms[id]),
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    setAndHandleChatsListener: ( params ) => dispatch(setAndHandleChatsListener( params )),
    updateChats: () => dispatch(updateChats())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( ChatsListContainer )
