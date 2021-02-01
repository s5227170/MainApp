import React, { FC,useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RootState } from '../../store';
import { settask, setError, setpage } from '../../store/actions/productActions';

import Create from '../UI/CRUD/Create';
import Update from '../UI/CRUD/Update';
import View from '../UI/CRUD/View';
import Delete from '../UI/CRUD/Delete';
import List from '../UI/CRUD/List';

const Browser: FC = () => {
    const { refresh } = useSelector((state: RootState) => state.prod);
    const { task } = useSelector((state: RootState) => state.prod);
    const { error } = useSelector((state: RootState) => state.prod);
    //const { newTask } = useSelector((state: RootState) => state.prod);
    const { product } = useSelector((state: RootState) => state.prod);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if(error) {
                dispatch(setError(''));
            }
        }
    }, [error, dispatch]);

    useEffect(() => {
        // if(newTask == task) {
        //     dispatch(settask(""));
        // }else {
        //     dispatch(settask(task));
        // }
        dispatch(settask(""));
        dispatch(setpage("ProductManagement"));
    }, []);

      switch(task){
          case "":
              return(
                  <div>
                        <List/>
                  </div>
              )
              case " ":
              return(
                  <div>
                        <List/>
                  </div>
              )
          case "Create":
              return (
                <div>
                  <Create />
                </div>
              )
          case "Update":
              return (
                <div>
                  <Update {...product}/>
                </div>
              )
          case "View":
              return (
                  <div>
                      <View {...product} />
                  </div>
              )
          case "Delete":
              return (
                  <div>
                      <Delete />
                  </div>
              )
          default: 
            return(
                <div>
                    <h1>There was a problem loading the page!</h1>
                </div>
            )
      }
}

export default withRouter(Browser);