import React, { FC, Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';

import classes from './Pagination.module.scss';
import style from './Pagination.module.scss';
import usePagination from '../../../hooks/usePagination';
import { Product } from '../../../store/types';
import { setid, setproduct, settask } from '../../../store/actions/productActions';
import { RootState } from '../../../store';

interface paginationProps {
    data: Product[];
    itemsPerPage: number;
    startFrom: number;
}

const Pagination: FC<paginationProps> = ({ data, itemsPerPage, startFrom }) => {
    const [loading, setLoading] = useState(false);
    const [itemID, setItemID] = useState<Array<string>>();

    const dispatch = useDispatch();

    const { slicedData, pagination, prevPage, nextPage, changePage } = usePagination({ itemsPerPage, data, startFrom});
    const { error } = useSelector((state: RootState) => state.prod);
    const { itemIDs } = useSelector((state: RootState) => state.prod);

    useEffect(() => {
            
    })

    useEffect(() => {
        document.getElementById("loadData")?.click();
    }, [data])

    const updateProductHandler = (target: Product, id: number) => {
        setLoading(true);
        dispatch(setproduct(target, error));
        if(itemID){
            dispatch(setid(itemID[id]));
        }
        dispatch(settask("Update"));
        setLoading(false)
    }

    const deleteProductHandler = ( i: number) => {
        setLoading(true);
            dispatch(setid(itemIDs[i]));
        dispatch(settask("Delete"));
        setLoading(false)
    }

    const viewProductHandler = (target: Product) => {
        setLoading(true);
        dispatch(setproduct(target, error));
        dispatch(settask("View"));
        setLoading(false)
    }

    return (
        <Fragment>
            <div className={classes['table-wrapper']}>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Reduced</th>
                        <th>Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    
                    { slicedData.map((item, i)=> (
                        <tr key={item.id}>
                            <td onClick={(e) => viewProductHandler(item)}>{item.title}</td>
                            <td onClick={(e) => viewProductHandler(item)}>{item.type}</td>
                            <td onClick={(e) => viewProductHandler(item)}>{item.reduced? "Yes" : "No"}</td>
                            <td onClick={(e) => viewProductHandler(item)}>{item.price}</td>
                            <td className={classes.btnCell} onClick={(e) => updateProductHandler(item, i)}>
                                <span id={style["update"]} className="material-icons md-20">
                                    create
                                </span>
                            </td>
                            <td className={classes.btnCell} onClick={(e) => deleteProductHandler(i)}>
                                <span id={style["delete"]}className="material-icons" >
                                    delete
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <nav className={classes.pagination}>
                
                <ul className={classes.list}>
                <button className={classes.paginationPrev} onClick={prevPage}>Previous</button>
                    {pagination.map((page, i)=> {
                        if(!page.ellipsis) {
                            return <li className={classes.pageContainer} key={page.id}>
                                <button id={page.id==1? "loadData" : " "} disabled={page.current} className={page.current ? classes.paginationLinkCurrent : classes.paginationLink}
                                onClick={(e) => changePage(page.id, e)}>
                                    {page.id}
                                </button>
                            </li>
                        }else {
                            return <li className={classes.paginationEllipsis} key={page.id}>
                                
                          </li>
                        }
                    })}
                <button className={classes.paginationNext} onClick={nextPage}>Next</button>
                </ul>
            </nav>
        </Fragment>
    )
}

export default Pagination;