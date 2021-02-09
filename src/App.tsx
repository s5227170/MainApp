import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.scss';


import Header from './components/pages/Header';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import ForgotPassword from './components/pages/ForgotPassword';
import Homepage from './components/pages/Homepage';
import Browse from './components/pages/Browse';
import About from './components/pages/About';
import Dashboard from './components/pages/Dashboard';
import ProductManagement from './components/pages/ProductManagement';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import AdminRoute from './components/auth/AdminRoute';
import Loader from './components/UI/Loader/Loader';
import firebase from './firebase/config';
import { getUserById, setLoading, setNeedVerification } from './store/actions/authActions';
import { RootState } from './store';
import MultiRoute from './components/auth/MultiRoute';


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
        <MultiRoute path="/About" component={About} exact/>
        <MultiRoute path="/Browse" component={Browse} exact/>
        <PublicRoute path="/Signup" component={SignUp} exact/>
        <PublicRoute path="/Signin" component={SignIn} exact/>
        <PublicRoute path="/ForgotPassword" component={ForgotPassword} exact/>
        <PrivateRoute path="/Dashboard" component={Dashboard} exact/>
        <AdminRoute path="/product-management" component={ProductManagement} exact/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
