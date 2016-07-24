import { bindActionCreators } from 'redux'
import { ChatInput } from 'components'
import { connect } from 'react-redux'

import * as inputActionCreators from 'redux/modules/chatInput'

function mapStateToProps ({users, chatInput}) {
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    chatText: chatInput.chatText
  }
}

function mapDispatchToProps ( dispatch ) {
  return bindActionCreators(inputActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( ChatInput )
