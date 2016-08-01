import React, { PropTypes } from 'react'
import { formatChat, formatFile } from 'helpers/utils'
import style from './styles.css'
import string from 'lodash/string'
import _ from 'lodash'
import restrictions from 'config/restrictions'

export default function ChatInput ( props ) {
  const allowedFileTypes = ['jpeg', 'jpg', 'png', 'gif']

  const handleSubmit = () => {
    let chat = {
      type: 'text',
      text: props.chatText,
      user: props.user.name,
      avatar: props.user.avatar
    }
    props.initiateSaveChat(formatChat(chat), props.roomId)
  }

  const handleChange = ( e ) => {
    props.updateChatText( e.target.value )
  }

  const handleUpload = ( e ) => {
    let image = e.target.files[0];
    if ( !image.type.match('image.*') ) {
      let error = {
        message: 'File type not allowed.'
      }
      return false
    } else {
      let chat = {
        type: 'image',
        user: props.user.name,
        avatar: props.user.avatar
      }
      props.initiateUploadFile(image, formatFile(chat), props.roomId)
    }
  }

  return (
    <div className="input-group">
      <input
        className="form-control"
        type="text"
        onChange={ handleChange }
        placeholder="Type a message" />
      <span className="input-group-btn">
        <label className="btn btn-default btn-file">
          <span className="glyphicon glyphicon-upload"></span>
          <input
            type="file"
            className={`btn btn-default ${style.noDisplay}`}
            onChange={ handleUpload }/>
        </label>
          <button
            className="btn btn-default"
            type="button"
            onClick={ handleSubmit }>
            {'Submit'}
          </button>
      </span>
    </div>
  )
}

ChatInput.PropTypes = {
  roomId: PropTypes.string.isRequired,
  chatText: PropTypes.string.isRequired,
  updateChatText: PropTypes.func.isRequired,
  initiateSaveChat: PropTypes.func.isRequired
}
