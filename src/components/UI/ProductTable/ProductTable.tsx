import React, { FC, Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import classes from './ProductTable.module.scss';
import usePagination from '../../../hooks/usePagination';
import { Product, Stock } from '../../../store/types';
import { setglobalbackdrop, setid, setproduct, setshowmodal, setstocktochange, settask } from '../../../store/actions/productActions';
import { RootState } from '../../../store';
import Modal from './../Modal/Modal';
import StockManager from '../StockManager/StockManager';
import GlobalBackdrop from '../GlobalBackdrop/GloalBackdrop';

interface paginationProps {
    data: Stock[] | Product[];
    itemsPerPage: number;
    startFrom: number;
    fields: string[];
    columns: string[];
    stock? : boolean;
}

const ProductTable: FC<paginationProps> = ({ data, itemsPerPage, startFrom, fields, columns, stock }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { slicedData, pagination, prevPage, nextPage, changePage } = usePagination({ itemsPerPage, data: data, startFrom });
    const { error } = useSelector((state: RootState) => state.prod);
    const { productIDs } = useSelector((state: RootState) => state.prod);
    const { stockIDs } = useSelector((state: RootState) => state.prod);
    const { stockToChange } = useSelector((state: RootState) => state.prod);
    const { stockToChangeID } = useSelector((state: RootState) => state.prod);
    const { globalBackdrop } = useSelector((state: RootState) => state.prod);
    const { showModal } = useSelector((state: RootState) => state.prod);


    useEffect(() => {
        
    }, [stockToChange])

    useEffect(() => {
        document.getElementById("loadData")?.click();
    }, [data])

    const updateProductHandler = (target: Product, i: number) => {
        setLoading(true);
        dispatch(setproduct(target, error));
        dispatch(setid(productIDs[i]));
        dispatch(settask("Update"));
        setLoading(false)
    }

    const deleteProductHandler = (i: number) => {
        setLoading(true);
        dispatch(setid(productIDs[i]));
        dispatch(settask("Delete"));
        setLoading(false)
    }

    const viewProductHandler = (target: Product) => {
        setLoading(true);
        dispatch(setproduct(target, error));
        dispatch(settask("View"));
        setLoading(false)
    }

    const managerOpenHandler = (item: Stock, id: string) => {
        dispatch(setshowmodal(!showModal))
        dispatch(setstocktochange(item, id))
        dispatch(setglobalbackdrop(!globalBackdrop))

    }

    return (
        <Fragment>
            <div className={classes['table-wrapper']}>
                {globalBackdrop?
                    <GlobalBackdrop />
                :
                    null
                }

                {showModal?
                        <Modal>
                            {stockToChange?
                                <StockManager stockItem={stockToChange} id={stockToChangeID}/>
                            :
                                null
                            }
                            {/* {console.log("the item is = " + stockToChange)} */}
                        </Modal>
                    :
                        null
                }

                <table className={!stock? classes.Blue : classes.Lime}>
                    <thead>
                        <tr>
                            {columns.map((item, i) => (
                                <th key={uuid()}>{item}</th>
                            ))}
                            {!stock?
                            <Fragment>
                                <th>Update</th>
                                <th>Delete</th>
                            </Fragment>
                            :
                            <Fragment>
                                <th>Manage stock</th>
                            </Fragment>
                            }
                        </tr>
                    </thead>
                    <tbody>

                        {slicedData.map((item, i) => (
                            <tr key={item.id}>
                                {(fields).map((field, j) => (
                                    ((item[field] || item[field] === false || item[field] === 0|| item[field] == undefined) ? 
                                        <td key={uuid()} onClick={(e) => viewProductHandler(item)}>{item[field] == true? "yes" : item[field] === false? "no" : item[field]}</td>
                                        :
                                        null)
                                ))}
                                {/* <td onClick={(e) => viewProductHandler(item)}>{item.type}</td>
                            <td onClick={(e) => viewProductHandler(item)}>{item.reduced? "Yes" : "No"}</td>
                            <td onClick={(e) => viewProductHandler(item)}>{item.price}</td> */}
                                {!stock? 
                                    <Fragment>
                                        <td className={classes.btnCell} onClick={(e) => updateProductHandler(item, i)}>
                                            <button className={classes["T-button-blue"]}>Select</button>
                                        </td>
                                        <td className={classes.btnCell} onClick={(e) => deleteProductHandler(i)}>
                                            <button className={classes["T-button-blue"]}>Select</button>
                                        </td>
                                    </Fragment>
                                : 
                                    <Fragment>
                                        <td>
                                            <button className={classes["T-button-lime"]} onClick={() => managerOpenHandler(item, stockIDs[i])}>Select</button>
                                        </td>
                                    </Fragment>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav className={classes.pagination}>

                <ul className={!stock? classes.listBlue : classes.listLime}>
                    <button className={classes.paginationPrev} onClick={prevPage}>Previous</button>
                    {pagination.map((page, i) => {
                        if (!page.ellipsis) {
                            return <li className={classes.pageContainer} key={page.id}>
                                <button id={page.id == 1 ? "loadData" : " "} disabled={page.current} className={page.current ? classes.paginationLinkCurrent : classes.paginationLink}
                                    onClick={(e) => changePage(page.id, e)}>
                                    {page.id}
                                </button>
                            </li>
                        } else {
                            return <li className={classes.paginationEllipsis} key={page.id}>

                            </li>
                        }
                    })}
                    
                    <button className={classes.paginationNext} onClick={nextPage} disabled={data.length==1}>Next</button>
                </ul>
            </nav>
        </Fragment>
    )
}

export default ProductTable;