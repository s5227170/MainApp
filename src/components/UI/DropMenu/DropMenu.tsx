import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';

import {  signout } from '../../../store/actions/authActions';
import classes from './DropMenu.module.scss';
import { RootState } from '../../../store';

const DropMenu: FC = () => {
    const dispatch = useDispatch();
    const { page } = useSelector((state: RootState) => state.prod);
    const { admin } = useSelector((state: RootState) => state.auth)

    const logoutClickHandler = () => {
        dispatch(signout());
    }

    return(
        <div className={classes["menu-items-case"]}>
                {page=="Dashboard" ?
                    <NavLink activeClassName={classes.active} to="/Dashboard" >Home</NavLink>
                : 
                    <NavLink to="/Dashboard" >Home</NavLink>}
                {admin ?
                    page=="ProductManagement" ?
                        <NavLink activeClassName={classes.active} to="/product-management" >Admin Panel</NavLink>
                    : 
                        <NavLink  to="../product-management" >Admin Panel</NavLink>
                :
                    null
                }
                {page=="Browse" ?
                    <NavLink activeClassName={classes.active} to="/Browse" >Browse</NavLink>
                : 
                    <NavLink to="/Browse" >Browse</NavLink>}
                {page=="About" ?
                    <NavLink activeClassName={classes.active} to="/About" >About</NavLink>
                : 
                    <NavLink to="/About" >About</NavLink>}
                <NavLink to="" onClick={logoutClickHandler}>SignOut</NavLink>
        </div>
    );
}

export default DropMenu;
