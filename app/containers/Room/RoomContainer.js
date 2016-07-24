import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ChatInputContainer, ChatListContainer } from 'containers'


export default class RoomContainer extends React.Component {

  constructor ( props ) {
    super ( props )
  }

  render () {
    return (
      <div>
        <ChatListContainer roomId={this.props.params.roomId} />
        <ChatInputContainer roomId={this.props.params.roomId} />
      </div>
    )
  }
}


// RoomContainer.PropTypes = {
//
// }
