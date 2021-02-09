import { FC, useEffect, useState } from 'react';
import { setpage } from '../../store/actions/productActions';
import { useDispatch } from 'react-redux';

import classes from './stylesheets/About.module.scss';

const About: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setpage("About"));
    }, []);
    
    return(
        <section className={classes.section}>
            <h1>test</h1>
        </section>
    );
}

export default About;