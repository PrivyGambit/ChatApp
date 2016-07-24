import React, { PropTypes, contextTypes } from 'react'
import { Authenticate } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'

class AuthenticateContainer extends React.Component {

  constructor ( props, context ) {
    super(props)
    context.router
  }

  handleAuth (e) {
    e.preventDefault()
    this.props.fetchAndHandleAuthedUser()
      .then(() => this.context.router.replace('results'))
  }

  render () {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth.bind( this )} />
    )
  }
}

AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
}

AuthenticateContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

const mapStateToProps = ({ users }) => {
  return {
    isFetching: users.isFetching,
    error: users.error,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( AuthenticateContainer )
