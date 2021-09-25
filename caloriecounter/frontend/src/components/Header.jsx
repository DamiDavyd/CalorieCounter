import React, { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/auth'
import { getUserRecomendedIntakeThunk } from '../reducers/intake'
import { Link } from 'react-router-dom'
import '../styles/_header.scss';
import { toggleBusketVisibility } from './common/toggleBusketVisibility'

export function Header({ aside, main }) {

  const dispatch = useDispatch()

  const isAuth = useSelector(state => state.auth.isAuth)
  const user = useSelector(state => state.auth.user)
  const intake = useSelector(state => {
    if (state.intake.intake) {
      return state.intake.intake.daily_calorie_intake
    }
  })

  useEffect(() => {
    if (isAuth) {
      dispatch(getUserRecomendedIntakeThunk())
    }
  }, [isAuth])

  function toggleLinksVisibility() {
    if (categoriesLink.current.style.display === 'none') {
      categoriesLink.current.style.display = 'block';
      diaryLink.current.style.display = 'block';
      intakeLink.current.style.display = 'block';
      authLinks.current.style.display = 'block';
    } else {
      categoriesLink.current.style.display = 'none';
      diaryLink.current.style.display = 'none';
      intakeLink.current.style.display = 'none';
      authLinks.current.style.display = 'none';
    }
  }

  function toggleBusketVisibilityForWideScreen() {
    if (aside.current.style.display === 'none') {
      aside.current.style.display = 'block'
    } else {
      aside.current.style.display = 'none'
    }
  }

  const guestButtons = <>
    <div><Link className="header-link" to={'/app/login'}>Login</Link></div>
    <div className="header-text">Or</div>
    <div><Link className="header-link" to={'/app/register'}>Register</Link></div>
  </>

  const authButtons = <>
    <div className="user-info">
      {user ? <>as <span className="username-in-header">{user.username}</span></> : null}<br />
      {intake ? <span className="kcal-in-header">({intake} kcal)</span> : null}
    </div>
    <button className="logout-button" onClick={() => dispatch(logoutUser())}>Logout</button>
  </>

  const categoriesLink = useRef(null);
  const diaryLink = useRef(null);
  const intakeLink = useRef(null);
  const authLinks = useRef(null);

  return (
    <header className="header-container">
      <div className="flex-for-small">
        <Link className="header-link" to="/"><h2 className="header">Food Diary</h2></Link>
        <div className="toggle-basket-button">
          <Link className="header-link" to="#"
            onClick={() => toggleBusketVisibility(aside, main)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
              <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
            </svg></Link>
        </div>

        <div className="toggle-menu-btn">
          <Link className="header-link" to="#"
            onClick={toggleLinksVisibility}>&#9776;</Link>
        </div>

      </div>

      <div>
        <Link className="header-link link-visible-for-wide" to="/" ref={categoriesLink}>Categories</Link>
      </div>
      <div>
        <Link className="header-link link-visible-for-wide" to="/app/days" ref={diaryLink}>Diary</Link>
      </div>
      <div>
        <Link className="header-link link-visible-for-wide" to="/app/calorie-intake"
          ref={intakeLink}>Calorie Intake</Link>
      </div>

      <div>
        <Link className="header-link link-visible-for-wide" to="#" onClick={toggleBusketVisibilityForWideScreen}>
          Basket
        </Link>
      </div>

      <div className="auth-buttons-flex-container" ref={authLinks}>
        <div className="flex-for-small">{isAuth ? authButtons : guestButtons}</div>
      </div>

    </header>
  )
}
