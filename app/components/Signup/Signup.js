import React, { PropTypes } from 'react'
import { centeredContainer, largeHeader, errorMsg, successMsg } from 'sharedStyles/styles.css'
import style from './styles.css'

export default function Signup (props, context) {

  const handleChangeValue = (e) => {
    props.updateSignup(e.target.id, e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.initiateSaveUser(props.signup)
      .then(() => context.router.replace('login'))
  }

  return (
    <div className={centeredContainer, style.signup}>
      <form className={style.signupForm}>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" onChange={handleChangeValue} className="form-control" id="email" placeholder="Enter Email" />
        </div>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input type="text" onChange={handleChangeValue} className="form-control" id="name" placeholder="Enter User Name" />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input type="text" onChange={handleChangeValue} className="form-control" id="firstname" placeholder="Enter First Name" />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" onChange={handleChangeValue} className="form-control" id="lastname" placeholder="Enter Last Name" />
        </div>
        <div className="form-group">
          <label htmlFor="password1">Password</label>
          <input type="password" onChange={handleChangeValue} className="form-control" id="password1" placeholder="Enter password" />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" onChange={handleChangeValue} className="form-control" id="password2" placeholder="Confirm password" />
        </div>
        <button type="submit" className="btn btn-default" onClick={handleSubmit}>Submit</button>
      </form>
      {props.error ? <p className={errorMsg}>{props.error}</p> : null}
      {props.success ? <p className={successMsg}>{props.success}</p> : null}
    </div>
  )
}
