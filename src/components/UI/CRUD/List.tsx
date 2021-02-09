import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import style from "./stylesheets/List.module.scss";
import ProductTable from "../ProductTable/ProductTable";
import { RootState } from "../../../store";
import {
  listproducts,
  setbackdrop,
  setids,
  liststock,
} from "../../../store/actions/productActions";
import { Product, Stock } from "../../../store/types";
import classes from "./stylesheets/List.module.scss";
import BrowserNavbar from "../Browser-navbar/BrowserNavbar";

const List: FC = () => {
  //
  const [products, setProducts] = useState<Array<Product>>([]);
  const [stocks, setStocks] = useState<Array<Stock>>([]);
  const [stock, setStock] = useState(false);
  const [itemID, setItemID] = useState<Array<string>>();
  const [stockID, setStockId] = useState<Array<string>>();
  const dispatch = useDispatch();
  const { product_array } = useSelector((state: RootState) => state.prod);
  const { backdrop } = useSelector((state: RootState) => state.prod);
  const { stock_array } = useSelector((state: RootState) => state.prod);
  useEffect(() => {
    dispatch(listproducts());
    dispatch(liststock());
  }, []);

  useEffect(() => {
    if (product_array) {
      const itemIDs: any = Object.entries(product_array).map((e) => e[0]);
      const toArr: any = Object.entries(product_array).map((e) => e[1]);
      setProducts(toArr);
      setItemID(itemIDs);
      if (itemID) dispatch(setids(itemID));
    }
    
  }, [product_array]);

  useEffect(() => {
    if(stock_array) {
      const stockIDs: any = Object.entries(stock_array).map((e) => e[0]);
      const toArr: any = Object.entries(stock_array).map((e) => e[1]);
      setStocks(toArr);
      setStockId(stockIDs);
    }
  }, [stock_array])

  const showSidebarHandler = () => {
    dispatch(setbackdrop(!backdrop));
  };

  const RefreshHandler = () => {
    dispatch(listproducts());
    dispatch(liststock());
  };
  return (
    <div className={classes.section}>
      <div className={classes.mode}>
        {/* Add a state taht controls which table should be showed. The data stays the same, it just gets filtered */}
        <h3 className={classes['font-color']} onClick={() => (setStock(false))}>Product</h3>
        <h4 className={classes['font-color']}>/</h4>
        <h3 className={classes['font-color']} onClick={() => (setStock(true))}>Stock</h3>
        <span
          id={style["drop-menu"]}
          className="material-icons md-36"
          onClick={showSidebarHandler}
        >
          view_headline
        </span>
        <span
          id={classes["refresh"]}
          className="material-icons md-36"
          onClick={RefreshHandler}
        >
          cached
        </span>
      </div>
      
      <h2 className={[classes['font-color'], classes['header']].join(' ')}>{stock? "Stock menu" : "Product menu"}</h2>
      {backdrop ? <BrowserNavbar stock={stock}/> : null}

      {/* Fix pagination - when having more pages, the span gets bugged, problem is probably a typo when watching the video, redo it */}
      {!stock ? (
        <ProductTable
          data={products}
          itemsPerPage={10}
          startFrom={0}
          fields={["title", "type", "reduced", "price"]}
          columns={["Title", "Type", "Reduced", "Price"]}
        />
      ) : ( 
        <ProductTable
          data={stocks}
          itemsPerPage={10}
          startFrom={0}
          fields={["product", "type", "quantity", "fire", "sold"]}
          columns={["Name", "Type", "Quantity", "Fire", "Sold"]}
          stock={stock}
        />
      )}
    </div>
  );
};

export default List;
