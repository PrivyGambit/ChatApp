import React, { PropTypes } from 'react'
import { formatTimestamp } from 'helpers/utils'
import { Spinner } from 'components'
import { RoomContainer } from 'containers'
import style from './styles.css'

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
        <RoomContainer />
    </div>
  )
}
