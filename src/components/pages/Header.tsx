import React, { FC } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import logo from '../../static/img/logo.png';
import Button from '../UI/Button/Button';
import DropMenu from '../UI/DropMenu/DropMenu';
import { RootState } from '../../store';
import { signout } from '../../store/actions/authActions';
import classes from './stylesheets/Header.module.scss';


const Header: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state: RootState) => state.auth);
    const { admin } = useSelector((state: RootState) => state.auth)

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
                    <div className={classes.navbarItems}>
                        {!authenticated ? 
                            <div className={classes.buttons}>
                                <Button className={classes.button1} text="Sign up" onClick={() => history.push('/signup')} />
                                <Button className={classes.button2} text="Sign in" onClick={() => history.push('/signin')} />
                            </div>
                            :
                            <DropMenu />
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;