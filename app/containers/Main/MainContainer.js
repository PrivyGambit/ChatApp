import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { Navigation } from '../../components'
import { connect } from 'react-redux'
// import { container, innerContainer } from './styles.css'
import * as userActionCreators from '../../redux/modules/users'
import { firebaseAuth } from '../../config/constants'
import { formatUserInfo } from '../../helpers/utils'
import { fetchUser, saveToLocalStorage, clearLocalStorage } from '../../helpers/api'
import _ from 'lodash'

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

                        // clearLocalStorage()
                        saveToLocalStorage( dataInfo ) //save to local storage

                        if ( newInfo.type !== 'anonymous' ) {
                            if ( this.props.location.pathname === '/' ) {
                                this.context.router.replace('/')
                            }
                        }

                    })

            } else {
                this.props.removeFetchingUser()
                let email = 'anonymous@anonymous.com'
                let password = 'anonymous'
                return firebaseAuth()
                    .signInWithEmailAndPassword(email, password)
                    .catch(function(error) {
                        return error.message
                })
                .then(() => clearLocalStorage())
                .then((user) => saveToLocalStorage(user))
            }
        })
    }

    render () {
        let type
        let isModerate
        type = !this.props.user.type || this.props.user.type == 'anonymous' ? false : true
        isModerate = this.props.user.type == 'moderate' ? true : false
        // console.log(localStorage);
        // if ( window.localStorage ) {
            // if ( localStorage.getItem('type') ) {
            //     type = localStorage.getItem('type') == 'anonymous' ? false : true;
            // }
        // }

        return (
            <div className="container">
                <Navigation
                    isAuthed={type}
                    isModerate={isModerate} />
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
