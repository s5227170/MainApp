import { ProductAction, ProductState, SET_BACKDROP, SET_TASK, SET_PAGE, SET_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, VIEW_PRODUCT, LIST_PRODUCT, SET_LOADING, SET_ERROR, SET_ID, SET_FEATURE_ARRAY, SET_PRODUCT_LOADING, SET_PRODUCT_FAIL, CREATE_STOCK, LIST_STOCK, SET_STOCK_TO_CHANGE, SET_GLOBAL_BACKDROP, SHOW_MODAL, UPDATE_STOCK, SET_PRODUCT_IDS_ARRAY, SET_STOCK_IDS_ARRAY } from '../types';

const initialState: ProductState = {
    productIDs: [],
    stockIDs: [],
    stock: null,
    stockToChange: null,
    stockToChangeID: null,
    product: null,
    error: '',
    loading: false,
    product_array: [],
    stock_array: [],
    task: "",
    page: "",
    backdrop: false,
    globalBackdrop: false,
    showModal: false,
    feature_array: [],
}

export default ( state = initialState, action: ProductAction) => {
    switch(action.type) {
        case SET_PRODUCT_IDS_ARRAY:
            return {
                ...state,
                productIDs: action.payload
            }
        case SET_STOCK_IDS_ARRAY:
            return {
                ...state,
                stockIDs: action.payload
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
        case SET_GLOBAL_BACKDROP:
            return {
                ...state,
                globalBackdrop: action.payload
            }
        case SHOW_MODAL:
            return {
                ...state,
                showModal: action.payload
            }
        case SET_ID:
            return {
                ...state,
                id: action.payload
            }
        case CREATE_PRODUCT:
            return {
                ...state,
                product: action.payload,
                feature_array: [] 
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
        case SET_STOCK_TO_CHANGE:
            return {
                ...state,
                stockToChange: action.payload,
                stockToChangeID: action.payload2

            }
        case UPDATE_STOCK:
            return {
                ...state,
                stock: action.payload
            }
        default:
            return state;
    }
}