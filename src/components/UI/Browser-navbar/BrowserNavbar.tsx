import Rreact, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { settask } from '../../../store/actions/productActions';
import Backdrop from '../Backdrop/Backdrop';

import classes from './BrowserNavbar.module.scss';
import styles from './BrowserNavbar.module.scss';

const BrowserNavbar: FC = () => {
    const [style, setStyle] = useState("on");
    const dispatch = useDispatch();
    const { backdrop } = useSelector((state: RootState) => state.prod);

    const createHandler = () => [
        dispatch(settask("Create"))
    ]

    return(
        <div>
            {backdrop?
            <div>
                <Backdrop />
                <div className={style=="on"? classes.BrowserNavbar : classes.Off }>
                        {/* Create a component for the bottons. Each component
                        will have as attributes - type(for the icon name), 
                        component(for the component to load on click, check routes for a tip) */}
                        <div className={classes.crudButtons}>
                            <h3>Menu</h3>
                            <div className={classes.optionContainer}>
                                <span id={styles['option1']} className="material-icons md-36" onClick={createHandler}>
                                    add_box
                                </span>
                                <h4 onClick={createHandler}>Create a Product</h4>
                            </div>
                            <div className={classes.optionContainer}>
                                <span id={styles['option2']} className="material-icons md-36">
                                    filter_alt
                                </span>
                                <h4>Filter Products</h4>
                            </div>
                            <div className={classes.optionContainer}>
                            <span id={styles['option3']} className="material-icons md-36">
                                local_fire_department
                            </span>
                            <h4>Set a hot Product</h4>
                            </div>
                        </div>
                </div>
            </div>
            :
            null}
        </div>
    );
}

export default BrowserNavbar;