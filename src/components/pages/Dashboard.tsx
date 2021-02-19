import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSuccess } from '../../store/actions/authActions';
import { RootState } from '../../store';
import { setpage, settask } from '../../store/actions/productActions';
import classes from'./stylesheets/Dashboard.module.scss';

const Dashboard: FC = () => {
    const { success } = useSelector((state: RootState) => state.auth);
    const dispatch=useDispatch();

    useEffect(() => {
        if(success) {
            dispatch(setSuccess(''));
        }
    }, [success, dispatch]);

    useEffect(() => {
        dispatch(setpage("Dashboard"));
    }, []);

    return (
        <section className={classes.section}>
            
        </section>
    );
}

export default Dashboard;