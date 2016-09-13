import React, { PropTypes, Component } from 'react'
import { ChatInput } from 'components'
import { AuthenticateContainer } from 'containers'
import _ from 'lodash'
import { filterText, formatChat, formatFile } from 'helpers/utils'
import * as inputActionCreators from 'redux/modules/chatInput'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export default class ChatInputContainer extends React.Component {

    constructor ( props ) {
        super( props )
        const allowedFileTypes = ['jpeg', 'jpg', 'png', 'gif']
        this.state = {
            showModal: false
        }
    }

    handleSubmit = ( e )  => {
        //access denied on unregistered users
        if ( !_.isEmpty(this.props.user) && this.props.user.type !== 'anonymous' ) {
            let chat = {
                type: 'text',
                text: this.props.chatInput.chatText,
                user: this.props.user.name,
                avatar: this.props.user.avatar
            }

            this.props.initiateSaveChat(formatChat(chat), this.props.currentRoom, this.props.chatInput.quote)
            // this.props.updateChatText( '', '' )
        } else {
            //pop up registration
            this.setState({ showModal: true })
        }
    }

    handleChange = ( e ) => {
        this.props.updateChatText( e.target.value, this.props.chatInput.quote )
    }

    handleUpload = ( e ) => {
        let image = e.target.files[0];
        if ( !image.type.match('image.*') ) {
            let error = {
                message: 'File type not allowed.'
            }
            return false
        } else {
            let chat = {
                type: 'image',
                user: this.props.user.name,
                avatar: this.props.user.avatar
            }
            this.props.initiateUploadFile(image, formatFile(chat), this.props.currentRoom, this.props.chatInput.quote)
        }
    }

    toggleModal () {
        this.setState({ showModal: !this.state.showModal })
    }

    render () {
        return (
            <div>
                <ChatInput
                    handleChange = { this.handleChange.bind( this ) }
                    handleUpload = { this.handleUpload.bind( this ) }
                    handleSubmit = { this.handleSubmit.bind( this ) }
                    chatText = { this.props.chatText } />
                { this.state.showModal ? <AuthenticateContainer toggleModal = { this.toggleModal.bind( this ) } /> : null }
            </div>
        )
    }
}

const mapStateToProps = ({ chatInput }) => {
    return {
        chatInput: {
            chatText: chatInput.chatText,
            quote: chatInput.quote
        }
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators(inputActionCreators, dispatch)
}

ChatInputContainer.PropTypes = {
    roomId: PropTypes.string.isRequired,
    chatText: PropTypes.string.isRequired,
    updateChatText: PropTypes.func.isRequired,
    initiateSaveChat: PropTypes.func.isRequired
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)( ChatInputContainer )
