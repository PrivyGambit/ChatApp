import React, { PropTypes } from 'react'
// import style from './styles.css'
import TimeAgo from 'react-timeago'

export default class DisplayRoomsList extends React.Component {

    constructor ( props ) {
        super( props )
    }

    formatContentChat ( text ) {
        let string = text
        if ( text.length > 80 ) {
            string = text.substring(0, 80)
            string += '...'
        }
        return string
    }

    handleChangeRoom (id) {
        this.props.removeChatsListener(id)
        this.props.setAndHandleChatsListener(id)
    }

    handleSearch (id) {
        this.props.actions.searchChat({
            query: '',
            roomId: id
        })
    }

    render () {
        return (
            <ul className='btnPressed list list-group'>
                {this.props.data.map((room) => {
                    const id = room.roomId
                    return (
                        <li key={id} className='listItem'>
                            {/*<Link to={`rooms/${id}`} className={`${style.anchor} list-group-item`}>
                            {room.roomName}
                            <div className={style.updateGroup}>
                            <p className={`${style.updateLabel} ${style.author}`}>{room.newContent.user ? room.newContent.user : 'Anonymous'}: </p>
                            <p className={style.updateLabel}>{room.newContent.chat ? this.formatContentChat( room.newContent.chat ) : 'Text here'} - </p>
                            <TimeAgo date={room.latestUpdateTime} className={style.timeAgo}/>
                            </div>
                            </Link>*/}
                            <div className='anchor list-group-item' onClick={()=> {this.handleChangeRoom(id)}}>
                                <button  onClick={()=> {this.handleSearch(id)}}>tester</button>
                                {room.roomName}
                                <div className='updateGroup'>
                                    <p className='updateLabel author'>{room.newContent.user ? room.newContent.user : 'Anonymous'}: </p>
                                    <p className='updateLabel'>{room.newContent.chat ? this.formatContentChat( room.newContent.chat ) : 'Text here'} - </p>
                                    <TimeAgo date={room.latestUpdateTime} className='timeAgo'/>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}
