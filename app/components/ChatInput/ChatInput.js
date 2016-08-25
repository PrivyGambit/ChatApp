import React, { PropTypes } from 'react'
import { formatChat, formatFile } from 'helpers/utils'
import style from './styles.css'
import string from 'lodash/string'
import _ from 'lodash'
import restrictions from 'config/restrictions'

export default function ChatInput ( props ) {
    const allowedFileTypes = ['jpeg', 'jpg', 'png', 'gif']

    return (
        <div className="input-group">
            <input
                className="form-control"
                type="text"
                onChange={ props.handleChange }
                placeholder="Type a message" />
            <span className="input-group-btn">
                <label className="btn btn-default btn-file">
                    <span className="glyphicon glyphicon-upload"></span>
                    <input
                        type="file"
                        className={`btn btn-default ${style.noDisplay}`}
                        onChange={ props.handleUpload }/>
                </label>
                <button
                    className="btn btn-default"
                    type="button"
                    onClick={ props.handleSubmit }>
                    {'Submit'}
                </button>
            </span>
        </div>
    )
}

ChatInput.PropTypes = {
    handleChange: PropTypes.func.isRequired,
    handleUpload: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}
