import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { ChatInput } from 'components'
import { connect } from 'react-redux'
import { ChatsList, Top } from 'components'
import { RoomInputContainer, RoomContainer } from 'containers'

import { setAndHandleChatsListener, updateChats } from 'redux/modules/chatsList'

export default class ModerateContainer extends React.Component {

    constructor ( props, context ) {
        super( props )
    }

    componentDidMount () {
        this.props.actions.updateChats()
        this.props.actions.setAndHandleChatsListener(this.props.roomId)
    }

    componentWillReceiveProps () {
        if ( this.props.user.type !== 'moderate' ) {
            // console.log('not moderate');
        } else {
            // console.log('bingo!!!');
        }
    }

    render () {
        return (
            <div>
                <RoomInputContainer />
                <RoomContainer />
            </div>
        )
    }
}

const mapStateToProps = ({users, chatsList, chatInput}) => {
    const rms = chatsList.chats
    if ( users[users.authedId] ) {
        if ( users[users.authedId].info.type == 'moderate' ) {
            // console.log(this.context);
        }
    }
    return {
        user: users[users.authedId] ? users[users.authedId].info : {},
        isFetching: chatsList.isFetching,
        error: chatsList.error,
        chats: Object.keys(rms).map((id) => rms[id]),
        chatInput: {
            chatText: chatInput.chatText,
            quote: chatInput.quote
        }
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        actions: {
            setAndHandleChatsListener: ( params ) => dispatch(setAndHandleChatsListener( params )),
            updateChats: () => dispatch(updateChats()),
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)( ModerateContainer )
