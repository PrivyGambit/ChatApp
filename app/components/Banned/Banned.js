import React, { PropTypes, Component } from 'react'
import { centeredContainer, largeHeader, errorMsg } from 'sharedStyles/styles.css'
import { SignupContainer } from 'containers'
import { default as ReactModal } from 'react-modal'

export default class Banned extends Component {

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
        this.props.toggleModal('banned')
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
                <div className = { centeredContainer }>
                    <p>Current user is banned on this chatApp.</p>
                </div>
            </ReactModal>
        )
    }
}
