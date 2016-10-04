import React, { PropTypes, Component } from 'react'
// import { centeredContainer, largeHeader, errorMsg } from 'sharedStyles/styles.css'
import { FacebookAuthButton, Signup } from '../../components'
import { SignupContainer, SignInContainer } from '../../containers'
import { default as ReactModal } from 'react-modal'

export default class Authenticate extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            modalIsOpen: true
        }
    }

    openModal() {
        this.setState({modalIsOpen: true})
    }

    closeModal () {
        this.setState({modalIsOpen: false})
        this.props.toggleModal('anonymous')
    }

    render () {
        const modalStyles = {
            content: {
                width: '50%',
                margin: 'auto',
                borderRadius: 5,
                background: '#EBEBEB',
                padding: 0,
            }
        }
        return (
            <ReactModal
                isOpen = { this.state.modalIsOpen }
                onRequestClose = { this.closeModal.bind( this ) }
                style = { modalStyles }>
                <div className = 'centeredContainer'>
                    <h1 className = 'largeHeader' >{'Authenticate'}</h1>
                    <FacebookAuthButton isFetching = { this.props.isFetching } onAuth = { this.props.onAuth } />
                    <h1>OR</h1>
                    <SignupContainer />
                    <h1>OR</h1>
                    <SignInContainer />
                    {this.props.error ? <p className = 'errorMsg'>{ this.props.error }</p> : null}
                </div>
            </ReactModal>
        )
    }
}

Authenticate.PropTypes = {
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onAuth: PropTypes.func.isRequired,
}
