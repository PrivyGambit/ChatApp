import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
// import withStyles from 'isomorphic-style-loader/lib/withStyles'
// import s from './styles.scss'
import { AuthenticateContainer } from '../../containers'

class NavLinks extends Component {

    constructor (props) {
        super( props )
    }

    render () {
        return this.props.isAuthed === true
            ? <ul>
                    <li><Link className='link' to='/'>{'Home'}</Link></li>
                </ul>
            : null
    }
}

class ActionLinks extends Component {
    constructor (props) {
        super( props )
        this.state = {
            showModal: false
        }
    }

    toggleModal () {
        this.setState({ showModal: !this.state.showModal })
    }

    render () {
        return this.props.isAuthed === true
            ? <ul>
                <li><Link className='link' to='/logout'>{'Logout'}</Link></li>
            </ul>
            : <ul>
                <li><Link className='link' to='/'>{'Home'}</Link></li>
                <li><button className='btn default' onClick={this.toggleModal.bind( this )}>Authenticate</button></li>
                { this.state.showModal ? <AuthenticateContainer toggleModal = { this.toggleModal.bind( this ) } /> : null }
            </ul>
    }
}

const Navigation = ( props, context ) => {
    return (
        <div className="container">
            <nav className='navContainer'>
                <NavLinks isAuthed={props.isAuthed}/>
                <ActionLinks isAuthed={props.isAuthed}/>
            </nav>
        </div>
    )
}

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
    isAuthed: PropTypes.bool.isRequired,
}

export default Navigation

// export default withStyles(Navigation, s)

// export default withStyles(s)(Navigation);
