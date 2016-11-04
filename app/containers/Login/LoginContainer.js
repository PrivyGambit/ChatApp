import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RoomContainer } from '../../containers'
import { Spinner } from '../../components'
import * as userActionCreators from '../../redux/modules/users'

class LoginContainer extends React.Component {
    constructor ( props ) {
        super( props )
    }
    render () {
        // if ( this.props.isFetching == true ) {
        //     return (
        //         <Spinner />
        //     )
        // }
        return (
            <RoomContainer />
        )
    }
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
)( LoginContainer )
