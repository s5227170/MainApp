import axios, { AxiosResponse } from 'axios';

import { Product, Stock } from '../store/types';

axios.defaults.baseURL = process.env.REACT_APP_FIREBASE_DB_URL;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const Products = {
    list: (): Promise<Product[]> => requests.get('/products.json'),
    details: (id: string) => requests.get(`/products/${id}.json`),
    create: (product: Product) => requests.post('/products.json', product),
    update: (product: Product, id: string) => requests.put(`/products/${id}.json`, product),
    delete: (id: string) => requests.del(`/products/${id}.json`)
}

const Stocks = {
    list: (): Promise<Stock[]> => requests.get('/stocks.json'),
    details: (id: string) => requests.get(`/stocks/${id}.json`),
    create: (stock: Stock) => requests.post('/stocks.json', stock),
    update: (stock: Stock, id: string) => requests.put(`/stocks/${id}.json`, stock),
    delete: (id: string) => requests.del(`/stocks/${id}.json`)
}

export default {
    Products,
    Stocks
}