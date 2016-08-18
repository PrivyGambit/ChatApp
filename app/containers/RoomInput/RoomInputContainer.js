import { bindActionCreators } from 'redux'
import { RoomInput } from 'components'
import { connect } from 'react-redux'

import * as inputActionCreators from 'redux/modules/roomInput'

function mapStateToProps ({users, roomInput}) {
    return {
        user: users[users.authedId] ? users[users.authedId].info : {},
        roomName: roomInput.roomName
    }
}

function mapDispatchToProps ( dispatch ) {
    return bindActionCreators(inputActionCreators, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)( RoomInput )
