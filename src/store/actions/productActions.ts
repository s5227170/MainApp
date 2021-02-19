import { ThunkAction } from 'redux-thunk';

import { Product, ProductAction, SET_TASK, SET_PAGE, SET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, VIEW_PRODUCT, LIST_PRODUCT, SET_ERROR, SET_LOADING, SET_BACKDROP, SET_ID, SET_FEATURE_ARRAY, SET_PRODUCT_FAIL, SET_PRODUCT_LOADING, Stock, CREATE_STOCK, LIST_STOCK, SET_STOCK_TO_CHANGE, SET_GLOBAL_BACKDROP, SHOW_MODAL, UPDATE_STOCK, SET_PRODUCT_IDS_ARRAY, SET_STOCK_IDS_ARRAY } from '../types';
import { RootState } from '..';
import agent from '../../api/agent';
import { Dispatch } from 'redux';

//Change stock amount
export const updatestock = (id: string, data: Stock) => async (dispatch: Dispatch<ProductAction>) => {
    try{
        await agent.Stocks.update(data, id).then(
            response => {
                dispatch({
                    type: UPDATE_STOCK,
                    payload: data
                })
            }
        )
    }catch(e) {

    }
}

//Set the stock to be modified
export const setstocktochange = (value: Stock, id: string) => ( dispatch: Dispatch<ProductAction> ) => {
    console.log(value)
    try{
        dispatch({
            type: SET_STOCK_TO_CHANGE,
            payload: value,
            payload2: id
        })
    }catch(e) {

    }
}

//Fetch stock state 
export const liststock = () => async ( dispatch: Dispatch<ProductAction> ) => {
    try{
        await agent.Stocks.list().then(
            response => {
                dispatch({
                    type: LIST_STOCK,
                    payload: response
                })
            }
        )
    }catch(e) {

    }
}

//Stock ID's container array
export const setstockids = (arr: string[]): ThunkAction<void, RootState, null, ProductAction> => {
    const updated_arr: string[] = [...arr]; 
    return dispatch => {
        dispatch({
            type: SET_STOCK_IDS_ARRAY,
            payload: updated_arr
        })
    }
}

//item ID's container array
export const setproductids = (arr: string[]): ThunkAction<void, RootState, null, ProductAction> => {
    const updated_arr: string[] = [...arr]; 
    return dispatch => {
        dispatch({
            type: SET_PRODUCT_IDS_ARRAY,
            payload: updated_arr
        })
    }
}

//Add element to the feature array
export const setfeature = (value: string, feat_arr: string[]): ThunkAction<void, RootState, null, ProductAction> => {
    const updated_feature_array: string[] = [...feat_arr]; 
    updated_feature_array.push(value);
    return dispatch => {
        dispatch({
            type: SET_FEATURE_ARRAY,
            payload: updated_feature_array
        })
    }
}

//Delete element from the feature array
export const deletefeature = (feat_arr: string[]): ThunkAction<void, RootState, null, ProductAction> => {
    const updated_feature_array: string[] = [...feat_arr];
    updated_feature_array.pop();
    return dispatch => {
        dispatch({
            type: SET_FEATURE_ARRAY,
            payload: updated_feature_array
        })
    }
}

//Extract the ID of the product that is to be deleted
export const setid = (value: string): ThunkAction<void, RootState, null, ProductAction> => {
    return dispatch => {
        dispatch({
            type: SET_ID,
            payload: value
        })
    }
}

//Backdrop pop/hide
export const setbackdrop = (value: boolean): ThunkAction<void, RootState, null, ProductAction> => {
    return dispatch => {
        dispatch({
            type: SET_BACKDROP,
            payload: value
        })
    }
}

//Global backdrop pop/hide
export const setglobalbackdrop = (value: boolean): ThunkAction<void, RootState, null, ProductAction> => {
    return dispatch => {
        dispatch({
            type: SET_GLOBAL_BACKDROP,
            payload: value
        })
    }
}

//Backdrop pop/hide
export const setshowmodal = (value: boolean): ThunkAction<void, RootState, null, ProductAction> => {
    return dispatch => {
        dispatch({
            type: SHOW_MODAL,
            payload: value
        })
    }
}

//Set the requested action type for the chosen product
export const settask = (value: " " | "" | "Create" | "Update" | "Delete" | "View" ): ThunkAction<void, RootState, null, ProductAction> => {
    return dispatch => {
        dispatch ({
            type: SET_TASK,
            payload: value
        });
    }
}

//Set Page for menu highlight
export const setpage = (value: "" | "SignIn" | "SignUp" | "ProductManagement" | "Browse" | "About" | "Dashboard" | "/"): ThunkAction<void, RootState, null, ProductAction> => {
    return dispatch => {
        dispatch ({
            type: SET_PAGE,
            payload: value
        });
    }
}

//Current product
export const setproduct= (data: Product, onError: () => void): ThunkAction<void, RootState, null, ProductAction> => {
    return dispatch => {
        try{
            dispatch({
                type: SET_PRODUCT,
                payload: data
            })
        } catch(err) {
            console.log(err);
            onError();
            dispatch({
                type: SET_ERROR,
                payload: err.Message
            });
        }
    }
}

//Create a product
export const createproduct = (data: Product) => async (dispatch: Dispatch<ProductAction>)  => {
        try{
            await agent.Products.create(data).then(
                async response => {
                    const stock:Stock = {
                        productID: response.name,
                        product: data.title,
                        type: data.type,
                        quantity: 0,
                        fire: data.fire,
                        sold: 0
                    }
                    await agent.Stocks.create(stock).then(
                        response => {
                            dispatch({
                            type: CREATE_STOCK,
                            payload: response
                            })
                        }
                    )
                }
            );  
        } catch(err) {
            console.log(err);
            dispatch({
                type: SET_ERROR,
                payload: err.Message
            });
        }
};


//Update a product
export const updateproduct = (id: string, data: Product, onError: () => void) => async (dispatch: Dispatch<ProductAction>) => {
    const updated_feature_array: string[] = [];
        try{
           await agent.Products.update(data, id).then(
                response => {
                    dispatch({
                    type: UPDATE_PRODUCT,
                    payload: data
                })
                dispatch({
                    type: SET_FEATURE_ARRAY,
                    payload: updated_feature_array
                })
            }
           )
        } catch(err) {
            console.log(err);
            onError();
            dispatch({
                type: SET_ERROR,
                payload: err.Message
            });
        }
}

//Delete a product
//data - id of the product requested for deletion
export const deleteproduct = (id: string, onError: () => void): ThunkAction<void, RootState, null, ProductAction> => {
    return async dispatch => {
        try{
            console.log(id)
            const target: any = await agent.Products.delete(id) 
            dispatch({
                type: DELETE_PRODUCT,
                payload: target
            })
        } catch(err) {
            console.log(err);
            onError();
            dispatch({
                type: SET_ERROR,
                payload: err.Message
            });
        }
    }
}

//View a producct
//data - id of the product requested for view
export const viewproduct = (data: string, load: () => void): ThunkAction<void, RootState, null, ProductAction> => {
    return async dispatch => {
        try{
            const target = await agent.Products.details(data);
            dispatch({
                type: VIEW_PRODUCT,
                payload: target
            })
            load();
        } catch(err) {
            console.log(err);
            dispatch({
                type: SET_ERROR,
                payload: err.Message
            });
        }
    }
}

export const listproducts = () => async ( dispatch: Dispatch<ProductAction>) => {
    try{
        dispatch({
            type: SET_PRODUCT_LOADING,
        })
        await agent.Products.list().then(
            response => {
                dispatch({
                    type: LIST_PRODUCT,
                    payload: response
                })}
            );
    }catch(e) {
        dispatch({
            type: SET_PRODUCT_FAIL
        })
    }
}

//Loading
export const setLoading = (value: boolean): ThunkAction<void, RootState, null, ProductAction> => {
    return dispatch => {
        dispatch ({
            type: SET_LOADING,
            payload: value
        });
    }
}


// Set error
export const setError = (msg: string): ThunkAction<void, RootState, null, ProductAction> => {
    return dispatch => {
        dispatch({
            type: SET_ERROR,
            payload: msg
        });
    }
}