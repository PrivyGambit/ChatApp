import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SignIn } from 'components'

import * as signinActionCreators from 'redux/modules/signin'

class SignInContainer extends Component {
    constructor ( props, context ) {
        super( props, context )
        context.router
    }

    signInUser ( user ) {
        this.props.initiateSignInUser(user)
            .then(() => this.context.router.replace('login'))
    }

    render () {
        return (
            <SignIn
                {...this.props}
                signInUser={this.signInUser.bind( this )} />
        )
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators(signinActionCreators, dispatch)
}

const mapStateToProps = ({signin}) => {
    return signin
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)( SignInContainer )


SignInContainer.contextTypes = {
    router: PropTypes.object.isRequired
}
