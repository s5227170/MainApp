import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';


import { RootState } from '../../../store';
import { deleteproduct, settask } from '../../../store/actions/productActions';
import classes from "./stylesheets/Delete.module.scss";

const Delete: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [helperState, setHelperState] = useState("");
    const { error } = useSelector((state: RootState) => state.prod);
    const [loading, setLoading] = useState(false);
    const { id } = useSelector((state: RootState) => state.prod);
    useEffect(() => {
        return () => {
            setHelperState(uuid());
        }
    }, [])

    // useEffect(() => {

    // }, [id])

    async function SubmitHandler (){
        setLoading(true);
        dispatch(deleteproduct(id , () => (error)));
        setTimeout(() => {
            dispatch(settask(""));
        }, 1500);
    }

    const DeclineHandler = () => {
        dispatch(settask(""));
    }

    return(
        <div className={classes.section}>
            <h2>Are you sure you want to delete this product from the Database?</h2>
            <div className={classes.buttonContainer}>
                <button className={classes.accept} onClick={SubmitHandler} disabled={loading}>Aprove</button>
                <button className={classes.decline} onClick={DeclineHandler}>Decline</button>
            </div>
        </div>
    );
}

export default Delete;