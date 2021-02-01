import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../UI/Message/Message';
import { setSuccess } from '../../store/actions/authActions';
import { RootState } from '../../store';
import { setpage, settask } from '../../store/actions/productActions';
import classes from'./stylesheets/Dashboard.module.scss';
import { Redirect } from 'react-router';

const Dashboard: FC = () => {
    const { user, needVerification, success } = useSelector((state: RootState) => state.auth);
    const { task } = useSelector ((state: RootState) => state.prod);
    const dispatch=useDispatch();

    useEffect(() => {
        if(success) {
            dispatch(setSuccess(''));
        }
    }, [success, dispatch]);

    useEffect(() => {
        dispatch(setpage("/"));
    }, []);

    return (
        <section className={classes.section}>
            <div className="main-container">
                <h1 className="is-size-1">Wellcome { user['firstName'] }</h1>
                {needVerification && <Message type="success" msg="Please verify your email address"/>}
            </div>
        </section>
    );
}

export default Dashboard;