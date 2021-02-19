import { FC } from 'react';

import classes from './Modal.module.scss';

const Modal: FC = (props) => {
    
    return(
        <div>
            <div className={classes.Modal}>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;