import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { Navigation } from '../../components'
import { connect } from 'react-redux'
// import { container, innerContainer } from './styles.css'
import * as userActionCreators from '../../redux/modules/users'
import { firebaseAuth } from '../../config/constants'
import { formatUserInfo } from '../../helpers/utils'
import { fetchUser } from '../../helpers/api'

class MainContainer extends Component {

    constructor ( props, context ) {
        super( props, context )
        context.router // context initiate
    }

    componentDidMount () {
        firebaseAuth().onAuthStateChanged((user) => {
            if ( user ) {
                const userData = user.providerData[0]
                this.props.authUser(user.uid)
                this.props.fetchDatabaseUserInfo( user.uid )
                    .then((dataInfo)=> {
                        const newInfo = dataInfo.info
                        const userInfo = formatUserInfo(
                            newInfo.uid,
                            newInfo.banned,
                            newInfo.name,
                            newInfo.avatar,
                            newInfo.type
                        ) //format user to desired object format
                        this.props.fetchingUserSuccess(
                            newInfo.uid,
                            userInfo,
                            Date.now()
                        )

                        if ( newInfo.type !== 'anonymous' ) {
                            if ( this.props.location.pathname === '/' ) {
                                this.context.router.replace('login')
                            }
                        }

                    })

            } else {
                this.props.removeFetchingUser()
            }
        })
    }

    render () {
        const authed = !this.props.user.type || this.props.user.type == 'anonymous' ? false : true;
        return (
            <div className="container">
                <Navigation isAuthed={authed} />
                <div className="innerContainer">
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
    fetchingUserSuccess: PropTypes.func.isRequired,
}

MainContainer.contextTypes = {
    router: React.PropTypes.object
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

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)( MainContainer )
