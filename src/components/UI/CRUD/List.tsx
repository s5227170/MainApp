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
            dispatch(setids(itemIDs));
        }
    }, [product_array])
    

    const showSidebarHandler  = () => {
        dispatch(setbackdrop(!backdrop));
    }

    const RefreshHandler = () => {
        dispatch(settask(" "));     
    }
    
    //The products are fetched as JSON, therefore they
    //can be operated directly without conversion.
    //Now a tabke is to be created containing all products,
    // as well as buttons for update and delete
    return(
        <div className={classes.section}>
            <span id={style["side-menu-btn"]} className="material-icons md-36" onClick={showSidebarHandler}>
                view_headline
            </span>
            <span id={style["refresh"]} className="material-icons md-36"  onClick={ RefreshHandler } >
                cached
            </span>
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