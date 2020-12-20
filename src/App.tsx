import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/pages/Header';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import ForgotPassword from './components/pages/ForgotPassword';
import Homepage from './components/pages/Homepage';
import Dashboard from './components/pages/Dashboard';
import Browser from './components/pages/Browser';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import AdminRoute from './components/auth/AdminRoute';
import Loader from './components/UI/Loader/Loader';
import firebase from './firebase/config';
import { getUserById, setLoading, setNeedVerification } from './store/actions/authActions';
import { RootState } from './store';


const App: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  //Check if user exists
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async  (user) => {
      if(user){
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if(!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if(loading){
    return <Loader/>;
  }
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Switch>
        <PublicRoute path="/" component={Homepage} exact/>
        <PublicRoute path="/signup" component={SignUp} exact/>
        <PublicRoute path="/signin" component={SignIn} exact/>
        <PublicRoute path="/forgot-password" component={ForgotPassword} exact/>
        <PrivateRoute path="/dashboard" component={Dashboard} exact/>
        <AdminRoute path="/product-management" component={Browser} exact/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
