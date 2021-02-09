import { ProductAction, ProductState, SET_BACKDROP, SET_TASK, SET_PAGE, SET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, VIEW_PRODUCT, LIST_PRODUCT, SET_LOADING, SET_ERROR, SET_ID, SET_FEATURE_ARRAY, SET_IDS_ARRAY, SET_PRODUCT_LOADING, SET_PRODUCT_FAIL, CREATE_STOCK, SET_STOCK, LIST_STOCK } from '../types';

const initialState: ProductState = {
    itemIDs: [],
    stock: null,
    product: null,
    error: '',
    loading: false,
    product_array: null,
    stock_array: null,
    task: "",
    page: "",
    backdrop: false,
    feature_array: [],
}

export default ( state = initialState, action: ProductAction) => {
    switch(action.type) {
        case SET_IDS_ARRAY:
            return {
                ...state,
                itemIDs: action.payload
            }
        case SET_FEATURE_ARRAY:
            return {
                ...state,
                feature_array: action.payload
            }
        case SET_BACKDROP:
            return {
                ...state,
                backdrop: action.payload
            }
        case SET_ID:
            return {
                ...state,
                id: action.payload
            }
        case CREATE_PRODUCT:
            return {
                ...state,
                product: action.payload 
            }
        case SET_TASK:
            return{
                ...state,
                task: action.payload,
            }
        case SET_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case SET_PRODUCT:
            return{
                ...state,
                product: action.payload
            }
        case SET_PRODUCT_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_ERROR:
                return {
                    ...state,
                    error: action.payload
                }
        case UPDATE_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                id: action.payload
            }
        case VIEW_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case LIST_PRODUCT:
            return {
                ...state,
                product_array: action.payload,
                loading: false
            }
        case SET_PRODUCT_FAIL:
            return {
                ...state,
                loading: false
            }
        case SET_STOCK:
            return {
                ...state,
                stock: action.payload
            }
        case CREATE_STOCK:
            return {
                ...state,
                stock: action.payload
            }
        case LIST_STOCK:
            return {
                ...state,
                stock_array: action.payload
            }
        default:
            return state;
    }
}