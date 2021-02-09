import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import logo from '../../static/img/logo.png';
import DropMenu from '../UI/DropMenu/DropMenu';
import { RootState } from '../../store';
import { signout } from '../../store/actions/authActions';
import classes from './stylesheets/Header.module.scss';


const Header: FC = () => {

    const dispatch = useDispatch();
    const { authenticated } = useSelector((state: RootState) => state.auth);
    const { page } = useSelector((state: RootState) => state.prod);

    const logoutClickHandler = () => {
        dispatch(signout());
    }
    return(
        <nav>
            <div className={classes.section}>
                <div className={classes.navbarLogo}>
                    <NavLink activeClassName={classes.logoLink} to={!authenticated ? "/" : "/dashboard"}><img className={classes.logo}  src={logo} alt="logo"/></NavLink>
                </div>

                <div className={classes.navbarEnd}>
                    {!authenticated ? 
                        <div className={classes.links}>
                        {page=="/" ?
                            <NavLink activeClassName={classes.active} to="/" exact>Main Page</NavLink>
                        : 
                            <NavLink to="/" >Main Page</NavLink>}
                        {page=="Browse" ?
                            <NavLink activeClassName={classes.active} to="/Browse" >Browse</NavLink>
                        : 
                            <NavLink to="/Browse" >Browse</NavLink>}
                        {page=="About" ?
                            <NavLink activeClassName={classes.active} to="/About" >About</NavLink>
                        : 
                            <NavLink to="/About" >About</NavLink>}
                        {page=="SignUp" ?
                            <NavLink activeClassName={classes.active} to="/Signup" >SignUp</NavLink>
                        : 
                            <NavLink className={classes.signUp} to="/Signup" >SignUp</NavLink>}
                        {page=="SignIn" ?
                            <NavLink activeClassName={classes.active} to="/Singin" >SignIn</NavLink>
                        : 
                            <NavLink className={classes.signIn} to="/Signin" >SignIn</NavLink>}
                        </div>
                        :
                        <DropMenu />
                    }
                </div>
            </div>
        </nav>
    );
}

export default Header;