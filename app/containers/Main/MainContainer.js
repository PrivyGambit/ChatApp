import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'
import * as userActionCreators from 'redux/modules/users'
import { firebaseAuth } from 'config/constants'
import { formatUserInfo } from 'helpers/utils'

class MainContainer extends Component {

    constructor ( props ) {
        super( props )
    }

    componentDidMount () {
        firebaseAuth().onAuthStateChanged((user) => {
            if ( user ) {
                const userData = user.providerData[0]
                const userInfo = formatUserInfo( userData.displayName, userData.photoURL, user.uid )
                this.props.authUser(user.uid)
                this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
                    .then(() => {
                        if ( this.props.location.pathname === '/' ) {
                            this.context.router.replace('login')
                        }
                    })
            } else {
                this.props.removeFetchingUser()
            }
        })
    }

    render () {
        return (
            <div className={container}>
                <Navigation isAuthed={this.props.isAuthed} />
                <div className={innerContainer}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

MainContainer.propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired
}

export default connect(
    ({users}) => ({
        isAuthed: users.isAuthed,
        isFetching: users.isFetching
    }),
    ( dispatch ) => bindActionCreators(userActionCreators, dispatch)
)( MainContainer )
