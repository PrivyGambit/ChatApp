import React, { PropTypes } from 'react'
// import style from './styles.css'

export default class SearchRoom extends React.Component {
    constructor ( props ) {
        super( props )
    }

    doSearch ( e ) {
        this.props.doSearch(e.target.value)
    }

    render () {
        return (
            <div className="SearchRoom">
                <div className="input-group searchInput">
                    <input
                        className='form-control'
                        value={this.props.query}
                        onChange={this.doSearch.bind( this )}
                        type='text'
                        placeholder='Enter search keyword' />
                </div>
            </div>
        )
    }
}
