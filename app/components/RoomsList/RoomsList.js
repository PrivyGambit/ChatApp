import React, { PropTypes, Component } from 'react'
import { formatRoomName, formatTimestamp } from 'helpers/utils'
import { Link } from 'react-router'
import style from './styles.css'
import { SearchRoom, DisplayRoomsList } from 'components'

export default function RoomsList (props) {
    let list = ''
    if ( props.isPressed )
        list = <DisplayRoomsList data={props.filteredData} {...props}/>
    return (
        <div className={style.wrapper}>
            <h5>Sort By:</h5>
            <div className="input-group">
                <label className={style.label}>
                    <input
                        value="name"
                        onChange={props.handleSort}
                        name="radioBtn"
                        className={style.radio}
                        type="radio"
                        aria-label="labelName"
                        id="radioName"/>
                    Name
                </label>
            </div>
            <div className="input-group">
                <label className={style.label}>
                    <input
                        value="time"
                        onChange={props.handleSort}
                        name="radioBtn"
                        className={style.radio}
                        type="radio"
                        aria-label="labelName"
                        id="radioTime" />
                    Latest Update
                </label>
            </div>
            <div className={`${style.toggle} btn btn-default`}>
                { props.isPressed ? <SearchRoom query={props.query} doSearch={props.doSearch} /> : '' }
                <span
                    className={`${style.arrow} caret`}
                    onClick={props.handleToggle} ></span>
            </div>
            {list}
        </div>
    )
}
