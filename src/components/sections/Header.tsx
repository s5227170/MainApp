import React, { FC } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../UI/LogButton';
import { RootState } from '../../store';
import { signout } from '../../store/actions/authActions';

const Header: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state: RootState) => state.auth);
    const { admin } = useSelector((state: RootState) => state.auth)

    const logoutClickHandler = () => {
        dispatch(signout());
    }
    return(
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link className="navbar-item" to={!authenticated ? "/" : "/dashboard"}>AppName</Link>
                </div>

                <div className="navbar-end">
                    <div className="navbar-items">
                        {!authenticated ? <div className="buttons">
                            <Button text="Sign up" onClick={() => history.push('/signup')} className="is-primary"/>
                            <Button text="Sign in" onClick={() => history.push('/signin')} />
                            </div>
                            :
                            <div>
                                <Button text="Sign out" onClick={logoutClickHandler} />
                                {admin ? <Button text="Products" onClick={() => history.push('../product-management')}/> : false}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;