import React, { PropTypes } from 'react'
// import style from './styles.css'

export default class UserList extends React.Component {

    constructor ( props ) {
        super( props )
    }

    handleBanUser ( id ) {
        this.props.banUser( id )
    }

    handleUnBanUser ( id ) {
        this.props.unBanUser( id )
    }

    render () {
        // console.log(this.props);
        return (
            <div className="panel panel-default">
                <div className="panel-heading">User List</div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.userlist.map(( user, i ) => {
                            const info = user.info
                            const id = info.uid ? info.uid : info.userId
                            return (
                                <tr key={id}>
                                    <th scope="row"></th>
                                    <td>{info.name}</td>
                                    <td>{info.type}</td>
                                    <td>{id}</td>
                                    <td>
                                        { info.banned
                                            ? <button onClick={this.handleUnBanUser.bind(this, id)} type="button" className="btn btn-success">UNBAN</button>
                                            : <button onClick={this.handleBanUser.bind(this, id)} type="button" className="btn btn-danger">BAN</button>
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
