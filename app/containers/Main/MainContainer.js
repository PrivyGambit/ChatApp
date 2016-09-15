import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'
import * as userActionCreators from 'redux/modules/users'
import { firebaseAuth } from 'config/constants'
import { formatUserInfo } from 'helpers/utils'
import { fetchUser } from 'helpers/api'

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
                // const userDataInfo = fetchUser( user.uid )
                // const userDataInfo = fetchUser( user.uid )
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
        console.log(this.props);
        const authed = !this.props.user.type || this.props.user.type == 'anonymous' ? false : true;
        return (
            <div className={container}>
                <Navigation isAuthed={authed} />
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

const mapStateToProps = ({ users }) => {
    return {
        user: users[users.authedId] ? users[users.authedId].info : {},
        isFetching: users.isFetching,
        error: users.error,
        isAuthed: users.isAuthed
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( MainContainer )
