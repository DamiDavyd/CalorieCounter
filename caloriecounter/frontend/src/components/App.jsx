import React, { useEffect, useRef } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import { PrivateRoute } from './common/PrivateRoute'
import { useAlert } from 'react-alert'

import { Header } from './Header'
import { Calendar } from './private/Calendar'
import { loadUser } from '../reducers/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from './Search'
import { Category } from './Category'
import { Food } from './Food'
import Categories from './Categories'
import { FoodBasket } from './FoodBasket'
import { toggleDropdownVisibility } from '../reducers/foods'
import { CalorieIntake } from './CalorieIntake'
import '../styles/app.scss';

export function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  const successMessage = useSelector(state => state.success.message)
  const errorMessage = useSelector(state => state.errors.message)

  const alert = useAlert()

  useEffect(() => {
    if (successMessage) {
      alert.show(successMessage, {
        type: 'success',
      })
    }
  }, [successMessage])

  useEffect(() => {
    if (errorMessage) {
      alert.show(errorMessage, {
        type: 'error',
      })
    }
  }, [errorMessage])

  const main = useRef(null);
  const aside = useRef(null);

  return (
    <div onClick={() => dispatch(toggleDropdownVisibility(false))}>
      <Header aside={aside} main={main} />
      <Search />
      <div className="flex-cont-for-main-and-basket">
        <main ref={main}>
          <Switch>
            <Route exact path="/" component={Categories} />
            <PrivateRoute exact path="/app/days" component={Calendar} />
            <Route exact path="/app/category/:category" component={Category} />
            <Route exact path="/app/food/:food" component={Food} />
            <Route exact path="/app/calorie-intake" component={CalorieIntake} />
            <Route exact path="/app/login" component={Login} />
            <Route exact path="/app/register" component={Register} />
          </Switch>
        </main>
        <aside ref={aside}>
          <FoodBasket aside={aside} main={main} />
        </aside>
      </div>
    </div >
  )
}