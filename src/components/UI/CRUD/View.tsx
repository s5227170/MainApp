import React, { FC, useState, useEffect, FormEvent } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { v4 as uuid } from 'uuid';
import CurrencyFormat from 'react-currency-format';


import { RootState } from '../../../store';
import { setError, settask } from '../../../store/actions/productActions';
import { Product } from '../../../store/types';
import { useHistory } from 'react-router';
import InputV2 from '../InputV2/InputV2';
import Message from '../Message/Message';
import classes from './stylesheets/View.module.scss';
import style from './stylesheets/View.module.scss';
import Features from '../Features/Features';

const View: FC<Product> = (Product) => {
    const history = useHistory();
    const [helperState, setHelperState] = useState("");
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.prod);

    useEffect(() => {
        return () => {
            if(error) {
                dispatch(setError(''));
            }
        }
    }, [error, dispatch]);

    useEffect(() => {
        return () => {
            setHelperState(uuid());
        }
    }, [])

    const returnHandler = () => {
        dispatch(settask(""));
    }

    //Change to a formal View and also change it in the update section
    return(
        <div className={classes.section}>
                <div className={classes.return} onClick={returnHandler}>
                    <span className="material-icons md-36" id={style["return-icon"]}>
                        keyboard_return
                    </span>
                </div>
                <h1>Overview</h1>
                <h3>Product features</h3>
                    <Features featsNumber={Product.feature_array.length} feats={Product.feature_array} ids="feats" number={Product.feature_array.length} preview={true}/>

                    <br/>
                    <h3>Product image</h3>
                    <hr className={classes.divider}></hr>
                    <div className={classes.imageManagement}>
                        <div className={classes.imgContainer}>
                            <img className={classes.imgShowcase} src={Product.avatar} alt={Product.title + " avatar"}/>
                        </div>
                    </div>
                <h3>Set product details</h3>
                <hr className={classes.divider}></hr>
                {error && <Message type='danger' msg={error} />}
                        <InputV2
                            inputCasingStyle="input-create"
                            name="Title"
                            value={Product.title}
                            placeholder=""
                            content="Title"
                            
                        />
                        <InputV2
                            inputCasingStyle="input-create"
                            name="Type"
                            value={Product.type}
                            placeholder=""
                            content="Type"
                            
                        />
                        <InputV2
                            inputCasingStyle="input-create"
                            name="Description"
                            value={Product.description}
                            placeholder=""
                            content="Description"
                            
                            
                        />
                        <div className={classes.currencyWrapper}>          
                            <div className={classes.currencyInput}>
                                <CurrencyFormat
                                className={classes.currency} 
                                name="Price"
                                value={Product.price}
                                thousandSeparator={true} 
                                prefix={'£'} 
                                maxLength="7"
                                />
                                <div className={classes.underline}></div>
                                <label>Price</label>
                            </div>
                        </div>
                        {!Product.reduced ?
                            null
                        :
                            <div className="reduced">
                                <div className={classes.currencyWrapper}>
                                    <div className={classes.currencyInput}>
                                        <CurrencyFormat
                                            className={classes.currency} 
                                            name="old_price"
                                            value={Product.old_price}
                                            thousandSeparator={true} 
                                            prefix={'£'} 
                                            maxLength="7"
                                        />
                                        <div className={classes.underline}></div>
                                        <label>Old Price</label>
                                    </div>
                                </div>
                                <div className={classes.currencyWrapper}>
                                    <div className={classes.currencyInput}>
                                        <CurrencyFormat
                                            className={classes.currency} 
                                            name="new_price"
                                            value={Product.new_price}
                                            thousandSeparator={true} 
                                            prefix={'£'} 
                                            maxLength="7"
                                        />
                                        <div className={classes.underline}></div>
                                        <label>New Price</label>
                                    </div>
                                </div>
                            </div>  
                        }
                <div className={classes.underpageSpace}>

                </div>
            </div>
    );
}

export default View;