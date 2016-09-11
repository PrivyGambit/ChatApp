import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Top } from 'components'

class HomeContainer extends Component {

    constructor ( props ) {
        super( props )
    }

    render () {
        return (
            <Top />
        )
    }
}

export default connect()( HomeContainer )
