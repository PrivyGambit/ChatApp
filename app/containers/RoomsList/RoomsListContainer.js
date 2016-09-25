import React, { PropTypes, Component } from 'react'
import { formatRoomName, formatTimestamp } from '../../helpers/utils'
import { Link } from 'react-router'
// import style from './styles.css'
import { RoomsList } from '../../components'
import { connect } from 'react-redux'
import { setAndHandleChatsListener, updateChats, removeChatsListener, searchChat } from '../../redux/modules/chatsList'
import * as roomsActionCreators from '../../redux/modules/rooms'
import { setAndHandleRoomsListener } from '../../redux/modules/rooms'

class RoomsListContainer extends Component {

    constructor ( props ) {
        super ( props )
        this.state = {
            isPressed: false,
            query: '',
            filteredData: this.props.rooms
        }
    }

    doSearch ( queryText ) {
        let queryResult = []
        this.props.rooms.map(( rm ) => {
            if ( rm.roomName.toLocaleLowerCase().indexOf(queryText) !=-1 )
                queryResult.push(rm)
            this.setState({
                query: queryText,
                filteredData: queryResult
            })
        })
    }

    componentWillReceiveProps () {
        this.setState({
            filteredData: this.props.rooms
        })
    }

    handleToggle () {
        this.setState({
            filteredData: this.props.rooms,
            isPressed: !this.state.isPressed
        })
    }

    handleSort ( e ) {
        let type = e.target.value
        switch (type) {
            case 'name':
                document.getElementById('radioName').checked
                this.filterByName()
            break;

            case 'time':
                document.getElementById('radioTime').checked
                this.filterByTime()
            break
            default:
                return false
        }
    }

    filterByTime () {
        this.props.rooms.sort((a, b) => {
            if(a.latestUpdateTime > b.latestUpdateTime) return -1;
            if(a.latestUpdateTime < b.latestUpdateTime) return 1;
            return 0;
        })
        this.updatePropsToState()
    }

    filterByName () {
        this.props.rooms.sort((a, b) => {
            if(a.roomName < b.roomName) return -1;
            if(a.roomName > b.roomName) return 1;
            return 0;
        })
        this.updatePropsToState()
    }

    updatePropsToState () {
        this.setState({
            filteredData: this.props.rooms
        })
    }

    render () {
        // detect error property this.props.error
        return (
            <RoomsList
                isPressed={this.state.isPressed}
                query={this.state.query}
                handleToggle={this.handleToggle.bind( this )}
                doSearch={this.doSearch.bind( this )}
                handleSort={this.handleSort.bind( this )}
                filteredData={this.state.filteredData}
                rooms={this.props.rooms}
                removeChatsListener={this.props.actions.removeChatsListener.bind( this )}
                setAndHandleChatsListener={this.props.actions.setAndHandleChatsListener.bind( this )} />
        )
    }
}

RoomsListContainer.PropTypes = {
    rooms: PropTypes.array.isRequired
}

RoomsListContainer.defaultProps = {
    rooms: []
}

const mapStateToProps = ({ rooms }) => {
    const rms = rooms.rooms
    return {
        rooms: Object.keys(rms).map((id) => rms[id]),
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        actions: {
            setAndHandleChatsListener: ( params ) => dispatch(setAndHandleChatsListener( params )),
            removeChatsListener: (id) => dispatch(removeChatsListener(id)),
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)( RoomsListContainer )
