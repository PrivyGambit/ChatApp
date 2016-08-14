import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Signup } from 'components'

import * as inputActionCreators from 'redux/modules/signup'

class SignupContainer extends Component {
    constructor ( props ) {
        super( props )
    }

  render () {
    return (
      <Signup {...this.props} />
    )
  }
}

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators(inputActionCreators, dispatch)
}

const mapStateToProps = ({signup}) => {
    return signup
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)( SignupContainer )


SignupContainer.contextTypes = {
    router: PropTypes.object.isRequired
}
