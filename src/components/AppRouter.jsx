import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import Homepage from '../pages/HomePage'
import Loginpage from '../pages/LoginPage'
import NotfoundPage from '../pages/NotFoundPage'
import Profilepage from '../pages/ProfilePage'
import Registerpage from '../pages/RegisterPage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import TestPage from '../pages/TestPage'
import AdminPage from '../pages/AdminPage'
import LecturerPage from '../pages/LecturerPage'
import StudentPage from "../pages/StudentPage";
import QRScannerPage from "../pages/QRScannerPage";
import QRGeneratorPage from "../pages/QRGeneratorPage";
import QRDisplayPage from "../pages/QRDisplayPage";
import QRCheckPage from "../pages/QRCheckPage";

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <ProtectedRoute exact path='/login' component={Loginpage} />
          <ProtectedRoute exact path='/register' component={Registerpage} />
          <ProtectedRoute exact path='/profile' component={Profilepage} />
          <ProtectedRoute exact path='/test' component={TestPage} />
          <ProtectedRoute exact path='/admin' role={3} component={AdminPage} />
          <ProtectedRoute exact path='/lecturer' role={2} component={LecturerPage} />
          <ProtectedRoute exact path='/student' role={1} component={StudentPage} />
          <ProtectedRoute exact path='/qrscanner' component={QRScannerPage} />
          <ProtectedRoute exact path='/qrgenerator' component={QRGeneratorPage} />
          <Route exact path='/qrcode/:id' component={QRDisplayPage} />
          <Route exact path='/scan/:id' component={QRCheckPage} />
          <ProtectedRoute
            exact
            path='/forgot-password'
            component={ForgotPasswordPage}
          />
          <ProtectedRoute exact path='/reset-password' component={ResetPasswordPage} />
          <Route exact path='*' component={NotfoundPage} />
        </Switch>
      </Router>
    </>
  )
}

function ProtectedRoute(props) {
  const { currentUser, userRole } = useAuth()
  const { path, role } = props
  console.log('path', path)
  const location = useLocation()
  console.log('location state', location.state)

  if (
    path === '/login' ||
    path === '/register' ||
    path === '/forgot-password' ||
    path === '/reset-password'
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? '/'} />
    ) : (
      <Route {...props} />
    )
  }

  if (!currentUser) {
    return (
      <Redirect
      to={{
        pathname: '/login',
        state: {from: path},
      }}
    />
    )
  }

  if (role !== undefined) {
    if (role === userRole) {
      return <Route {...props} />;
    } else {
      return <Redirect
        to={{
          pathname: '/notfound',
        }}
      />
    }
  } else {
    return <Route {...props} />;
  }

  return (
    <Redirect
      to={{
        pathname: '/login',
        state: {from: path},
      }}
    />
  );
}