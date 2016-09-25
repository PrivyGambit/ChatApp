import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './styles.scss'
import { RoomInputContainer, RoomContainer } from '../../containers'

const Home = (props) => {
    return (
        <div className='container'>
            <p className='title'>{'ChatApp'}</p>
            {/*<RoomInputContainer />}
            <RoomContainer />*/}
        </div>
    )
}


export default withStyles(s)(Home);
