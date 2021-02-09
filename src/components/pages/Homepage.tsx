import React, { FC, useEffect } from 'react';
import { setpage } from '../../store/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

import classes from './stylesheets/Homepage.module.scss';

const Homepage: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setpage("/"));
    }, []);
    
    return(
        <section className={classes.section}>
            <div className="container">
                <h1 className="title has-text-centered is-size-1 mb-6">Wellcome</h1>
                <h2>Insert some data here</h2>
            </div>
        </section>
    );
}

export default Homepage;