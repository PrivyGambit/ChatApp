import React, { PropTypes } from 'react'
import { Link } from 'react-router'
// import { RoomsListContainer } from 'containers'
import style from './styles.css'
import { filterText, formatChat, formatFile } from 'helpers/utils'
import { ChatInputContainer } from 'containers'
import { ChatContent, SearchRoom } from 'components'

export default class ChatsList extends React.Component {

    constructor ( props ) {
        super(props)
        // this.state = {
        //     query: '',
        //     filteredData: this.props.chats
        // }
    }

    quoteChat = ( chat ) => {
        this.props.chatInputActions.updateQuote(this.props.chatInput.chatText, chat.chatId)
    }

    componentDidUpdate() {
        this.refs.chatListContent.scrollTop = this.refs.chatListContent.scrollHeight
    }

    // componentWillReceiveProps () {
    //     this.setState({
    //         query: '',
    //         filteredData: this.props.chats
    //     })
    // }

    getQuote = ( id ) => {
        let value = {}
        this.props.chats.map((chat)=> {
            if ( chat.chatId == id ) {
                value = chat;
            }
        })
        return value;
    }

    // doSearch ( queryText ) {
    //     let queryResult = []
    //     this.props.chats.map(( rm ) => {
    //         if ( rm.content.toLocaleLowerCase().indexOf(queryText) !=-1 )
    //             queryResult.push(rm)
    //         this.setState({
    //             query: queryText,
    //             filteredData: queryResult
    //         })
    //     })
    // }

    render () {
        return (
            <div className={style.mainContainer}>
                <div className={style.chatListContainer}>
                    { this.props.user.type == 'moderate' ?  <SearchRoom query={this.state.query} doSearch={this.doSearch.bind(this)} /> : '' }
                    <div className={style.chatContent} ref="chatListContent">
                        {this.props.chats.map(( chat ) => {
                            const id = chat.chatId
                            const type = chat.type
                            return (
                                <ChatContent
                                    key={id}
                                    chat={chat}
                                    quoteChat={this.quoteChat.bind(this)}
                                    getQuote={this.getQuote.bind(this)}
                                    userType={this.props.user.type} />
                            )
                        })}
                    </div>
                </div>
                { this.props.currentRoom && <ChatInputContainer {...this.props} /> }
            </div>
        )
    }
}

// class SearchBox extends React.Component {
//     constructor ( props ) {
//         super( props )
//     }
//
//     doSearch ( e ) {
//         this.props.doSearch(e.target.value)
//     }
//
//     render () {
//         return (
//             <div className={`input-group ${style.searchInput}`}>
//                 <input
//                     className='form-control'
//                     value={this.props.query}
//                     onChange={this.doSearch.bind( this )}
//                     type='text'
//                     placeholder='Enter search keyword' />
//             </div>
//         )
//     }
// }

// class ChatContent extends React.Component {
//
//     constructor (props) {
//         super(props)
//         this.state = {
//             showOptions: false
//         }
//     }
//
//     handleMouseEnter () {
//         this.setState({
//             showOptions: !this.state.showOptions
//         })
//     }
//
//     render () {
//         return (
//             <div onMouseEnter={ this.handleMouseEnter.bind( this ) } onMouseLeave={ this.handleMouseEnter.bind( this ) }>
//
//                 {this.state.showOptions && this.props.userType == 'moderate' ? <button type="button" className="btn btn-danger">Delete</button> : ''}
//             </div>
//         )
//     }
// }



ChatsList.PropTypes = {
    chats: PropTypes.array.isRequired,
}
