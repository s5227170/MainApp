import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setglobalbackdrop, setshowmodal } from '../../../store/actions/productActions';

import classes from './GlobalBackdrop.module.scss';

const GlobalBackdrop: FC = () => {
    const dispatch = useDispatch();
    const { globalBackdrop } = useSelector((state: RootState) => state.prod);
    const { showModal } = useSelector ((state: RootState) => state.prod)

    const backdropHandler = () => {
            dispatch(setglobalbackdrop(!globalBackdrop))
            dispatch(setshowmodal(!showModal))
    }

    return(
        <div className={classes.GlobalBackdrop} onClick={backdropHandler} >
        </div>
    );
}

export default GlobalBackdrop;