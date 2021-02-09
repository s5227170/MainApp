import { FC, useEffect } from 'react';
import { setpage } from '../../store/actions/productActions';
import { useDispatch } from 'react-redux';

import classes from './stylesheets/Browse.module.scss';

const Browse: FC = () => {
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(setpage("Browse"));
    }, []);
    
    return(
        <section className={classes.section}>
            <h2>test</h2>
        </section>
    );
}

export default Browse;