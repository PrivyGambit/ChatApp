import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { container, navContainer, link } from './styles.css'
import { AuthenticateContainer } from 'containers'

class NavLinks extends Component {

    constructor (props) {
        super( props )
    }

    render () {
        return this.props.isAuthed === true
            ? <ul>
                    <li><Link className={link} to='/'>{'Home'}</Link></li>
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
                <li><Link className={link} to='/logout'>{'Logout'}</Link></li>
            </ul>
            : <ul>
                <li><Link className={link} to='/'>{'Home'}</Link></li>
                <li><button className='btn default' onClick={this.toggleModal.bind( this )}>Authenticate</button></li>
                { this.state.showModal ? <AuthenticateContainer toggleModal = { this.toggleModal.bind( this ) } /> : null }
            </ul>
    }
}

export default class Navigation extends Component {
    constructor ( props ) {
        super( props )
    }

    render () {
        return (
            <div className={container}>
                <nav className={navContainer}>
                    <NavLinks isAuthed={this.props.isAuthed}/>
                    <ActionLinks isAuthed={this.props.isAuthed}/>
                </nav>
            </div>
        )
    }
}

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
    isAuthed: PropTypes.bool.isRequired,
}

// export default function Navigation ({isAuthed}) {
//     return (
//         <div className={container}>
//             <nav className={navContainer}>
//                 <NavLinks isAuthed={isAuthed}/>
//                 <ActionLinks isAuthed={isAuthed}/>
//             </nav>
//         </div>
//     )
// }
