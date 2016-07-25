import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Top } from 'components'
import { decisionsAreStale } from 'helpers/utils'

class LoginContainer extends React.Component {
  render () {
    return (
      <Top />
    )
  }
}

export default connect()(LoginContainer)
