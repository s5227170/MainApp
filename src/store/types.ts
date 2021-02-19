//Authentication
export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';
export const SET_SUCCESS = 'SET_SUCCESS';
//Product management
export const SET_FEATURE_ARRAY = 'SET_FEATURE_ARRAY';
export const SET_PRODUCT_IDS_ARRAY = 'SET_PRODUCT_IDS_ARRAY';
export const SET_ID = 'SET_ID';
export const SET_PRODUCT_FAIL = 'SET_PRODUCT_FAIL';
export const SET_PRODUCT_LOADING = 'SET_PRODUCT_LOADING';
//UI
export const SET_BACKDROP = 'SET_BACKDROP';
export const SET_GLOBAL_BACKDROP = 'SET_GLOBAL_BACKDROP';
export const SET_TASK = 'SET_TASK';
export const SET_NEWTASK = 'SET_NEWTASK';
export const SET_PAGE = 'SET_PAGE';
export const SHOW_MODAL = 'SHOW_MODAL';
//Stock
export const CREATE_STOCK = 'CREATE_STOCK';
export const LIST_STOCK = 'LIST_STOCK';
export const SET_STOCK_TO_CHANGE = 'SET_STOCK_TO_CHANGE';
export const UPDATE_STOCK = 'UPDATE_STOCK';
export const SET_STOCK_IDS_ARRAY = 'SET_STOCK_IDS_ARRAY';
//Products
export const SET_PRODUCT = 'SET_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const VIEW_PRODUCT = 'VIEW_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const LIST_PRODUCT = 'LIST_PRODUCT';

//Products
export interface Product {
    id: string;
    title: string;
    description: string;
    type: string;
    feature_array: string[];
    avatar: string;
    fire: boolean
    price: number;
    reduced: string;
    old_price: number;
    new_price: number;
    date: string;
}

export interface Stock {
    productID: string;
    product: string;
    type: string;
    quantity: number;
    fire: boolean;
    sold: number;
}

export interface ProductState {
    productIDs: string[];
    stockIDs: string[];
    stock: Stock | null;
    stockToChange: Stock | null;
    stockToChangeID: string | null;
    product: Product | null;
    error: '';
    loading: false;
    product_array: Array<Product> | null;
    stock_array: Array<Stock> | null;
    task: "Create" | "Update" | "Delete" | "View" | "";
    page: "Browse" | "About" | "ProductManagement" | "SignIn" | "SignUp" | "Dashboard" | "/" | "";
    backdrop: boolean;
    globalBackdrop: boolean;
    showModal: false;
    feature_array: string[] | null;
}

//Authentication
export interface User {
    firstName: string;
    email: string;
    id: string;
    createdAt: any;
    admin: boolean;
}

export interface AuthState {
    user: User | null;
    authenticated: boolean;
    admin: false;
    loading: boolean;
    error: string;
    needVerification: boolean;
    success: string;
}

//Sign In/ Sign out 
export interface SignUpData {
    firstName: string;
    email: string;
    password: string;
}

export interface SignInData {
    email: string;
    password: string;
}

//Actions - Auth
interface SetUserAction {
    type: typeof SET_USER;
    payload: User;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
}

interface needVerificationAction{
    type: typeof NEED_VERIFICATION;
}

interface SetSuccessAction{
    type: typeof SET_SUCCESS;
    payload: string;
}

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}


export type AuthAction = 
SetUserAction | 
SetLoadingAction |
SignOutAction |
SetErrorAction |
needVerificationAction |
SetSuccessAction;

//Actions - Product

interface setStockIDs {
    type: typeof SET_STOCK_IDS_ARRAY
    payload: string[]
}

interface setProductIDs {
    type: typeof SET_PRODUCT_IDS_ARRAY
    payload: string[]
}

interface setFeatureArray {
    type: typeof SET_FEATURE_ARRAY
    payload: string[]
}

interface setID {
    type: typeof SET_ID
    payload: string
}

interface setBackdrop {
    type: typeof SET_BACKDROP
    payload: boolean
}

interface setGlobalBackdrop {
    type: typeof SET_GLOBAL_BACKDROP
    payload: boolean
}

interface setTask {
    type: typeof SET_TASK
    payload: "Create" | "Update" | "Delete" | "View" | "" | " " ;
}

interface setPage {
    type: typeof SET_PAGE
    payload: "" | "ProductManagement" | "SignIn" | "SignUp" | "Browse" | "Dashboard" | "About" | "/";
}

interface setProduct {
    type: typeof SET_PRODUCT
    payload: Product;
}

interface createProductAction {
    type: typeof CREATE_PRODUCT
    payload: Product;
}

interface updateProductAction {
    type: typeof UPDATE_PRODUCT
    payload: Product
}

interface deleteProductAction {
    type: typeof DELETE_PRODUCT
    payload: Product;
}

interface viewProductAction {
    type: typeof VIEW_PRODUCT
    payload: Product;
}

interface listProductAction {
    type: typeof LIST_PRODUCT
    payload: Product[];
}

interface productLoading {
    type: typeof SET_PRODUCT_LOADING
}

interface productRequestFail {
    type: typeof SET_PRODUCT_FAIL
}

interface createStock {
    type: typeof CREATE_STOCK
    payload: Stock;
}

interface listStock {
    type: typeof LIST_STOCK
    payload: Stock[]
}

interface setStockToChange {
    type: typeof SET_STOCK_TO_CHANGE
    payload: Stock
    payload2: string
}

interface setShowModal {
    type: typeof SHOW_MODAL;
    payload: boolean;
}

interface updateStock {
    type: typeof UPDATE_STOCK;
    payload: Stock;
}

export type ProductAction =
setShowModal |
setStockToChange |
listStock |
createStock |
updateStock |
productLoading |
productRequestFail |
setProductIDs | 
setStockIDs |
setFeatureArray |
setID |
setBackdrop |
setGlobalBackdrop |
setPage |
setTask |
setProduct |
createProductAction |
updateProductAction | 
deleteProductAction |
viewProductAction |
SetErrorAction |
SetLoadingAction |
listProductAction;

