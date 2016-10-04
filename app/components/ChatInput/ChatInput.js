import React, { PropTypes, Component } from 'react'
import { formatChat, formatFile } from '../../helpers/utils'
// import style from './styles.css'
import string from 'lodash/string'
import _ from 'lodash'
import restrictions from '../../config/restrictions'

export default class ChatInput extends Component {
    constructor ( props ) {
        super( props )
        this.state = {
            chatInput: this.props.chatText
        }
    }

    render () {
        return (
            <div className="ChatInput">
                <div className="input-group">
                    <input
                        className="form-control"
                        type="text"
                        onChange={ this.props.handleChange }
                        placeholder="Type a message"
                        value={this.props.chatText} />
                    <span className="input-group-btn">
                        <label className="btn btn-default btn-file">
                            <span className="glyphicon glyphicon-upload"></span>
                            <input
                                type="file"
                                className='btn btn-default noDisplay'
                                onChange={ this.props.handleUpload }/>
                        </label>
                        <button
                            className="btn btn-default"
                            type="button"
                            onClick={ this.props.handleSubmit }>
                            {'Submit'}
                        </button>
                    </span>
                </div>
            </div>
        )
    }
}

ChatInput.PropTypes = {
    handleChange: PropTypes.func.isRequired,
    handleUpload: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}
