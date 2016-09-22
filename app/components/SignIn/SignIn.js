import React, { PropTypes } from 'react'
// import { centeredContainer, largeHeader, errorMsg, successMsg } from 'sharedStyles/styles.css'
// import style from './styles.css'

export default function SignIn (props, context) {

    const handleChangeValue = ( e ) => {
        props.updateSignIn(e.target.id, e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.signInUser(props.signIn)
    }

    return (
        <div className="centeredContainer Signin">
            <form className="SigninForm">
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" onChange={handleChangeValue} className="form-control" id="email" placeholder="Enter Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password1">Password</label>
                    <input type="password" onChange={handleChangeValue} className="form-control" id="password" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-default" onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    )
}
