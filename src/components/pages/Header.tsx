import React, { FC } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../UI/LogButton/LogButton';
import DropMenu from '../UI/DropMenu/DropMenu';
import { RootState } from '../../store';
import { signout } from '../../store/actions/authActions';
import './stylesheets/Header.css';

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
            <div className="navbar-section">
                <div className="navbar-logo-section">
                    <Link className="logo" to={!authenticated ? "/" : "/dashboard"}>AppName</Link>
                </div>

                <div className="navbar-end">
                    <div className="navbar-items">
                        {!authenticated ? <div className="buttons-section">
                            <Button text="Sign up" onClick={() => history.push('/signup')} />
                            <Button text="Sign in" onClick={() => history.push('/signin')} />
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