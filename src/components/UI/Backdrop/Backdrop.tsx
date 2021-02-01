import Rreact, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setbackdrop } from '../../../store/actions/productActions';

import classes from'./Backdrop.module.scss';

const Backdrop: FC = () => {
    const [nothing, setNothing] = useState(0);
    const dispatch = useDispatch();
    const { backdrop } = useSelector((state: RootState) => state.prod);

    const backdropHandler = () => {
        //if(backdrop){
            dispatch(setbackdrop(!backdrop))
        // }
        // else{
        //     dispatch(setbackdrop(backdrop))
        // }
    }

    return(
        <div className={classes.Backdrop} onClick={backdropHandler} >
        </div>
    );
}

export default Backdrop;