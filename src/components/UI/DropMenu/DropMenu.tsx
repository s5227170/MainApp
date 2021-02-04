import React, { FC, MouseEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';

import {  signout } from '../../../store/actions/authActions';
import './DropMenu.css';
import { RootState } from '../../../store';
//import { RootState } from '../../../store';

const DropMenu: FC = () => {
    const dispatch = useDispatch();
    const [hover, setHover] = useState(false);
    const { page } = useSelector((state: RootState) => state.prod);
    const { admin } = useSelector((state: RootState) => state.auth)
    const { authenticated } = useSelector((state: RootState) => state.auth);

    const logoutClickHandler = () => {
        dispatch(signout());
    }

    const onHoverHandler = (event: MouseEvent<HTMLDivElement>) => {
       event.preventDefault();
       setHover(true);
    }

    const onUnhoverHandler =(event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setHover(false);
    }

    return(
        <div className="menu-items-case">
                {page=="/" ?
                    <NavLink activeClassName="active-link" to="/" >Main Page</NavLink>
                : <NavLink to="/" >Main Page</NavLink>}
                {authenticated && admin ?
                    page=="ProductManagement" ?
                        <NavLink activeClassName="active-link" to="../product-management" exact>Admin Panel</NavLink>
                    : <NavLink  to="../product-management" exact>Admin Panel</NavLink>
                :
                    null
                }
                {page=="Browser" ?
                    <NavLink activeClassName="active-link" to="../Browser" exact>Browse</NavLink>
                : <NavLink to="../Browser" exact>Browse</NavLink>}
                {page=="About" ?
                    <NavLink activeClassName="active-link" to="../About" exact>About</NavLink>
                : <NavLink to="../About" exact>About</NavLink>}
                    <NavLink activeClassName="active-link last" to="" onClick={logoutClickHandler}>SignOut</NavLink>
        </div>
    );
}

export default DropMenu;

//{!hover ? "menu-items-case-off" : "menu-items-case"} onMouseOver={onHoverHandler} onMouseOut={onUnhoverHandler}