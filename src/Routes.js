import { Home } from './components/pages/Home'
import { UsersPage } from './components/pages/UsersPage'
import { SignIn } from './components/pages/SignIn'
import { SignUpPage } from './components/pages/SignUpPage'
import { ContactUs } from './components/pages/ContactUs'
import { PageNotFound } from './components/pages/404'
import { Router } from 'express'
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './auth/PrivateRoute'

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path='/' exact>
                    <Home />
                </PrivateRoute>
                <Route path='/'>
                    <UsersPage />
                </Route>
                <Route path='/signin'>
                    <SignIn />
                </Route>
                <Route path='/signup'>
                    <SignUpPage />
                </Route>
                <Route path='/contact'>
                    <ContactUs />
                </Route>
                <Route path='*'>
                    <PageNotFound />
                </Route>
            </Switch>
        </Router>
    )
}