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
        let markup
        if ( this.props.isAuthed === true ) {
            if ( this.props.isModerate == true ) {
                markup = (
                    <ul>
                        <li><Link className='link' to='/logout'>{'Logout'}</Link></li>
                    </ul>
                )
            } else {
                markup = (
                    <ul>
                        <li><Link className='link' to='/moderate'>{'Moderate'}</Link></li>
                        <li><Link className='link' to='/logout'>{'Logout'}</Link></li>
                    </ul>
                )
            }
        } else {
            markup = (
                <ul>
                    <li><Link className='link' to='/'>{'Home'}</Link></li>
                    <li><button className='btn default' onClick={this.toggleModal.bind( this )}>Authenticate</button></li>
                    { this.state.showModal ? <AuthenticateContainer toggleModal = { this.toggleModal.bind( this ) } /> : null }
                </ul>
            )
        }
        return (
            <div>
                { markup }
            </div>
        )
    }
}

const Navigation = ( props, context ) => {
    return (
        <div className="Navigation">
            <div className="container">
                <nav className='navContainer'>
                    <NavLinks isAuthed={props.isAuthed} isModerate={props.isModerate}/>
                    <ActionLinks isAuthed={props.isAuthed}/>
                </nav>
            </div>
        </div>
    )
}

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
    isAuthed: PropTypes.bool.isRequired,
}

export default Navigation
