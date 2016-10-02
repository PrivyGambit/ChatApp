import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { RoomContainer } from '../../containers'

class HomeContainer extends Component {

    constructor ( props ) {
        super( props )
    }

    render () {
        return (
            <RoomContainer />
        )
    }
}

export default connect()( HomeContainer )
