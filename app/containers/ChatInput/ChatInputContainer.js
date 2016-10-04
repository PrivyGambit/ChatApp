import React, { PropTypes, Component } from 'react'
import { ChatInput, Banned } from '../../components'
import { AuthenticateContainer } from '../../containers'
import _ from 'lodash'
import { filterText, formatChat, formatFile } from '../../helpers/utils'
import * as inputActionCreators from '../../redux/modules/chatInput'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class ChatInputContainer extends React.Component {

    constructor ( props ) {
        super( props )
        const allowedFileTypes = ['jpeg', 'jpg', 'png', 'gif']
        this.state = {
            showModalBanned: false,
            showModalAnonymous: false
        }
    }

    handleSubmit = ( e )  => {
        if ( this.props.user.banned ) {
            this.setState({ showModalBanned: true })
        }
        //access denied on unregistered users
        if ( !_.isEmpty(this.props.user) && this.props.user.type !== 'anonymous' ) {
            let chat = {
                type: 'text',
                text: this.props.chatInput.chatText,
                user: this.props.user.name,
                avatar: this.props.user.avatar ? this.props.user.avatar : 'null',
                announcement : this.props.user.type == 'moderate' ? true : false
            }

            this.props.initiateSaveChat(formatChat(chat), this.props.currentRoom, this.props.chatInput.quote)
            // this.props.updateChatText( '', '' )
        } else {
            //pop up registration
            this.setState({ showModalAnonymous: true })
        }
    }

    handleChange = ( e ) => {
        this.props.updateChatText( e.target.value, this.props.chatInput.quote )
    }

    handleUpload = ( e ) => {
        let image = e.target.files[0];
        if ( _.isEmpty(image.type.match("image.*")) ) {
            let error = {
                message: 'File type not allowed.'
            }
            return false
        } else {
            let chat = {
                type: 'image',
                user: this.props.user.name,
                avatar: this.props.user.avatar ? this.props.user.avatar : ''
            }
            let quote = this.props.chatInput.quote ? this.props.chatInput.quote : '';
            this.props.initiateUploadFile(image, formatFile(chat), this.props.currentRoom, quote)
        }
    }

    toggleModal (mode) {
        if ( mode == 'anonymous' ) {
            this.setState({ showModalAnonymous: !this.state.showModalAnonymous })
        }

        if ( mode == 'banned' ) {
            this.setState({ showModalBanned: !this.state.showModalBanned })
        }

    }

    render () {
        return (
            <div>
                <ChatInput
                    handleChange = { this.handleChange.bind( this ) }
                    handleUpload = { this.handleUpload.bind( this ) }
                    handleSubmit = { this.handleSubmit.bind( this ) }
                    chatText = { this.props.chatInput.chatText } />
                { this.state.showModalAnonymous ? <AuthenticateContainer toggleModal = { this.toggleModal.bind( this ) } /> : null }
            </div>
        )
    }
}

const mapStateToProps = ({ chatInput }) => {
    // console.log(chatInput);
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


module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)( ChatInputContainer )
