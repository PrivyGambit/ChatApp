import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { RoomsList } from 'components'
import { connect } from 'react-redux'
import * as roomsActionCreators from 'redux/modules/rooms'
import { setAndHandleRoomsListener } from 'redux/modules/rooms'

class RoomsListContainer extends React.Component {
  constructor ( props ) {
    super( props )
  }

  componentDidMount () {
    this.props.setAndHandleRoomsListener()
  }

  render () {
    return (
      <RoomsList
        user={this.props.user}
        rooms={this.props.rooms}
        roomInput={this.props.roomInput}
        error={this.props.error} />
    )
  }
}

const mapStateToProps = ({users, rooms}) => {
  const rms = rooms.rooms
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    isFetching: rooms.isFetching,
    error: rooms.error,
    rooms: Object.keys(rms).map((id) => rms[id]),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAndHandleRoomsListener: () => dispatch(setAndHandleRoomsListener()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( RoomsListContainer )
