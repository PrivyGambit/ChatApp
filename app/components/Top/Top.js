import React, { PropTypes } from 'react'
import { formatTimestamp } from 'helpers/utils'
import { Spinner } from 'components'
import { RoomsListContainer, RoomInputContainer, RoomContainer } from 'containers'

Results.propTypes = {
  // isFetching: PropTypes.bool.isRequired,
  // error: PropTypes.string.isRequired,
}

export default function Results (props) {
  if (props.isFetching === true) {
    return <Spinner />
  }
  return (
    <div>
      <RoomInputContainer />
      <RoomContainer />
      {/*<RoomsListContainer />*/}
    </div>
  )
}
