import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { v4 as uuid } from 'uuid';

import style from './stylesheets/List.module.scss';
import Pagination from '../../UI/Pagination/Pagination';
import { RootState } from '../../../store';
import { setError, listproducts, setbackdrop, setids, settask } from '../../../store/actions/productActions';
import { Product } from '../../../store/types';
import classes from './stylesheets/List.module.scss';
import BrowserNavbar from '../Browser-navbar/BrowserNavbar';
//import Pagination from './../../UI/Pagination/Pagination';

const List: FC = () => {
    //
    const [products, setProducts] = useState <Array<Product>>([]);
    const [productID, setProductID] = useState("");
    const [helperState, setHelperState] = useState("");
    const [itemID, setItemID] = useState<Array<string>>();
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.prod);
    const { product_array } = useSelector((state: RootState) => state.prod)
    const { backdrop } = useSelector((state: RootState) => state.prod);
    //Next two useEffect hooks are used to store the state to local storage since on refresh, the state is lost(BUG)
    // useEffect(() => {
    //     const data = localStorage.getItem('products');
    //     if(data){
    //         setProducts(JSON.parse(data));
    //     }
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem("products", JSON.stringify(products));
    // });

    useEffect(() => {
        dispatch(listproducts());
    }, []);

    useEffect(() => {
        console.log(product_array)
        if(product_array){
            const itemIDs: any = Object.entries(product_array).map(e => e[0]);
            const toArr: any = Object.entries(product_array).map(e => e[1]);
            setProducts(toArr);
            setItemID(itemIDs);
            if(itemID)
            dispatch(setids(itemID));
        }
    }, [product_array])
    

    const showSidebarHandler  = () => {
        dispatch(setbackdrop(!backdrop));
    }

    const RefreshHandler = () => {
        dispatch(listproducts());
    }
    
    return(
        <div className={classes.section}>
            <div className={classes.mode}>
                {/* Add a state taht controls which table should be showed. The data stays the same, it just gets filtered */}
                <h3>CRUD</h3>
                <h4>/</h4>
                <h3>Stock</h3>
            </div>
            <div className={classes.left}>
                <span id={style["side-menu-btn"]} className="material-icons md-36" onClick={showSidebarHandler}>
                    view_headline
                </span>
            </div>
            <div className={classes.right}>
                <span id={style["refresh"]} className="material-icons md-36"  onClick={ RefreshHandler } >
                    cached
                </span>
            </div>
            {backdrop?
            <BrowserNavbar/>
            :
            null
            }

                        {/* Fix pagination - when having more pages, the span gets bugged, problem is probably a typo when watching the video, redo it */}
            <Pagination data={products} itemsPerPage={10} startFrom={0}/>
            
        </div>
    );
}

export default List;