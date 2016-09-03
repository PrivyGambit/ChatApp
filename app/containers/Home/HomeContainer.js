import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Top } from 'components'

class HomeContainer extends React.Component {
    render () {
        return (
            <Top />
        )
    }
}

export default connect()( HomeContainer )
