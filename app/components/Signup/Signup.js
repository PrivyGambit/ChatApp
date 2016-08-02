import React, { PropTypes } from 'react'
import { centeredContainer, largeHeader, errorMsg } from 'sharedStyles/styles.css'
import style from './styles.css'

export default function Signup ({error, isFetching, onAuth}) {
  return (
    <div className={centeredContainer, style.signup}>
      <form className={style.signupForm}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}
