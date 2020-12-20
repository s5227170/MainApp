import React, { FC, MouseEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {  useDispatch } from 'react-redux';

import {  signout } from '../../../store/actions/authActions';
import './DropMenu.css';
//import { RootState } from '../../../store';

const DropMenu: FC = () => {
    const dispatch = useDispatch();
    const [hover, setHover] = useState(false);
 
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
                <p>MENU</p>
                <NavLink to="../product-management" exact>Admin Panel</NavLink>
                <NavLink to="../Browser" exact>Browse</NavLink>
                <NavLink to="../About" exact>About</NavLink>
                <NavLink to="" onClick={logoutClickHandler}>SignOut</NavLink>
        </div>
    );
}

export default DropMenu;

//{!hover ? "menu-items-case-off" : "menu-items-case"} onMouseOver={onHoverHandler} onMouseOut={onUnhoverHandler}