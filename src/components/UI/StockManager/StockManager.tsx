import { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setglobalbackdrop, setshowmodal, updatestock } from '../../../store/actions/productActions';
import { Stock } from '../../../store/types';

import classes from './StockManager.module.scss';

interface Props {
    stockItem: Stock;
    id: string
}

const StockManager: FC<Props> = ({stockItem, id}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [amount, setAmount] = useState(stockItem.quantity);
    const [loading, setLoading] = useState(false);
    
    console.log(stockItem + " + " + id);

    const submitHandler = () => {
        setLoading(true)
        const stock:Stock = {
            productID: stockItem.productID,
            product: stockItem.product,
            type: stockItem.type,
            fire: stockItem.fire,
            sold: stockItem.sold,
            quantity: amount
        }
        dispatch(updatestock(id, stock));
        setTimeout(() => {
            dispatch(setshowmodal(false));
            dispatch(setglobalbackdrop(false));
        }, 1500);
    }
    
    return(
            <div className={classes.section}>

                <div className={classes.data}>
                    <h5>Product name: {stockItem.product}</h5>
                    <h5>Product ID: {stockItem.productID}</h5>
                    <h5>Product type {stockItem.type}</h5>
                    <h5>Product fire mode: {stockItem.fire}</h5>
                </div>
                <div className={classes.quantity}>
                    <div className={classes['amount-box']}>
                        <label>Quantity</label>
                        <input type="number" name="amount" defaultValue={amount} onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(+e.target.value)}></input>
                    </div>
                    <button className={classes.set} onClick={submitHandler} disabled={loading}>{!loading? "Set amount" : "Loading..."}</button>
                </div>
            </div>
    );
}

export default StockManager;