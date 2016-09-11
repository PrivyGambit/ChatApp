import React, { PropTypes } from 'react'
import { centeredContainer, largeHeader, errorMsg } from 'sharedStyles/styles.css'
import { FacebookAuthButton, Signup } from 'components'
import { SignupContainer } from 'containers'

Authenticate.propTypes = {
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onAuth: PropTypes.func.isRequired,
}

export default function Login ({error, isFetching, manualLoginUser}) {

    const handleChangeValue = (e) => {
        // props.updateSignup(e.target.id, e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // props.initiateSaveUser(props.signup)
    }

    return (
        <div className={centeredContainer, style.signup}>
            <form className={style.signupForm}>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" onChange={handleChangeValue} className="form-control" id="email" placeholder="Enter Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" onChange={handleChangeValue} className="form-control" id="password" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-default" onClick={handleSubmit}>Submit</button>
            </form>
            <div>
                {props.error ? <p className={errorMsg}>{props.error}</p> : null}
                {props.success ? <p className={successMsg}>{props.success}</p> : null}
            </div>
        </div>
    )
}
