import React, { FC, useState, useEffect, FormEvent, ChangeEvent} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { v4 as uuid } from 'uuid';
import CurrencyFormat from 'react-currency-format';

import firebase from '../../../firebase/config';
import Button from '../Button/Button';
import Message from '../Message/Message';
import { RootState } from '../../../store';
import { createproduct, deletefeature, setfeature, settask } from '../../../store/actions/productActions';
import { setError } from '../../../store/actions/productActions';
import {  useHistory } from 'react-router';
import Features from '../Features/Features';
import InputV2 from '../InputV2/InputV2';
import classes from './stylesheets/Create.module.scss';
import style from './stylesheets/Create.module.scss';

const Create: FC = () => {
    //Change all separate states to a single object one.
    //Do the List next, will be in its own component and will be listed 
    //in its component, it will load whenever the product-management
    //is loaded and create will load upon click of a span element.
    
    const [fileSelected, setFileSelected] = useState<File>();
    const [loading, setLoading] = useState(false);
    const [validationLoading, setValidationLoading] = useState(false);
    //-------------
    //Disable inputs as validation
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(false);
    //input value to be dispatched
    const [currentWord, setCurrentWord] = useState("");
    //helps with the validation management
    const [filled, setFilled] = useState(true);
    //controlls the amount of inputs and validates
    const [amount, setAmount] = useState(0);
    //-------------
    const [title, setTitle] = useState('');
    const [type, setType]= useState("");
    const [description, setDescription] = useState('');
    const [avatar, setAvatar] = useState("");
    const [price, setPrice] = useState(0);
    const [reduced, setReduced] = useState(false);
    const [old_price, setOldPrice] = useState(0);
    const [new_price, setNewPrice] = useState(0);
    //
    const dispatch = useDispatch();
    const history = useHistory();
    const { error } = useSelector((state: RootState) => state.prod);
    const { feature_array } = useSelector((state: RootState) => state.prod);
    //

    useEffect(() => {
        dispatch(deletefeature(feature_array))
    }, [])

    useEffect(() => {
        return () => {
            if(error) {
                dispatch(setError(''));
            }
        }
    }, [error, dispatch]);

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setValidationLoading(true)

        if(amount <3){
            alert("You need at least 3 features in order to submit this product! If there already are 3, save themand try submitting again.")
        }else if(!fileSelected){
            alert("Product needs to have an avatar!")
        }else if(price > 10000 || price <=0){
            alert("Price needs to be between 1 and 10000!")
        }else{    
            //const file = fileSelected;
            if(!fileSelected) return;
            
            const storageRef = firebase.storage().ref('/images/');
            const fileRef = storageRef.child(fileSelected.name)
            const currentTime = new Date();
            const date = String(currentTime.getDate() + (currentTime.getMonth() + 1) + currentTime.getFullYear());
            
            await fileRef.put(fileSelected)
            const fileURL = await fileRef.getDownloadURL()
            

            setLoading(true);
            let id=uuid();

            if(feature_array)
            dispatch(createproduct({id, title, type, feature_array, description, avatar: fileURL, price, reduced, old_price, new_price, date }, () => setLoading(false)));
            setTimeout(() => {
                dispatch(settask(""))
            }, 1500);
        }
    }

    const reducedHandler = (e: FormEvent<HTMLSelectElement>) => {
        e.preventDefault();
        console.log(e.currentTarget.value)
        if(e.currentTarget.value == "Reduced price"){
            setReduced(true);
        } else{
            setReduced(false);
        }
    }

    const fileSelectedHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const filelist = e.target.files;
        if(!filelist) return;        
        setFileSelected(filelist[0]);        
    }

    const returnHandler = () => {
        dispatch(settask(""));
    }


    const addFeature = () => {
        if(amount>=15){
            alert("Maximum features reached!")
        }else if(!filled){
            alert("Fill existing feature and save!")
        }
        else{
            setLoading3(true)
            setLoading2(false);
            setFilled(false);
            setAmount(amount+1);
        }
    }

    const removeFeature = () => {
        if(amount > 0){
            setAmount(amount-1);
            dispatch(deletefeature(feature_array))
        }
    }

    const str = function(target: number){
        return target.toString();
    } 

    const check = function(amount: number) {
        amount=amount-1;
        const target: string="feats".concat(str(amount))
        document.getElementById(target)?.setAttribute("disabled", "true");

    }

    const saveFeature = () => {
        check(amount);
        setLoading3(false);
        setLoading2(true)
        dispatch(setfeature(currentWord, feature_array));
        setFilled(true)
        
    }

    const inputDataHandler = ({target}: {target: EventTarget | null}) => {
        const {value} = target as HTMLInputElement
        setCurrentWord(value)
    }            

    const clickFileUpldHandler = () => {
        document.getElementById("real-file")?.click();
    }

    return(
        <div className={classes.section}>
            
            <div className={classes.return} onClick={returnHandler}>
                <span className="material-icons md-36" id={style["return-icon"]}>
                    keyboard_return
                </span>
            </div>

            <h2>Enter product details</h2>
                <h3>Features</h3>
                <hr className={classes.divider}></hr>
                <div className={classes.featureManagement}>
                    {/* Buttons controlling the feature amount */}
                    <Button className="custom-btn" text="Add" onClick={addFeature} disabled={!loading2}/>
                    <Button className="custom-btn" text="Remove" onClick={removeFeature} disabled={loading3}/>
                    <Button className="custom-btn" text="Save" onClick={saveFeature} disabled={!loading3}/>
                    {/* <button  className={style["custom-btn"]} onClick={addFeature} disabled={!loading2}>Add</button>
                    <button  className={style["custom-btn"]} onClick={removeFeature} disabled={loading3}>Remove</button>
                    <button  className={style["custom-btn"]} onClick={saveFeature} disabled={!loading3}>Save</button> */}
                </div>
                    {/* Add the features component here, it must get the number of fields, depending on the
                    parameter given, it should do this dynamically */}
                        <Features ids="feats" number={amount} onBlur={inputDataHandler} preview={false}/>
                    {/* ---- */}
                
            
                <h3>Product Image</h3>
                <hr className={classes.divider}></hr>
                <div className={classes.imageManagement}>
                    <input id="real-file" hidden={true}  type="file" onChange={fileSelectedHandler}/>
                    <button id="custom-button" className={style["custom-btn"]} onClick={clickFileUpldHandler} disabled={fileSelected? true : false}>{fileSelected? "Uploaded..." : "Upload"}</button>
                </div>
            <h3>Details</h3>
            <hr className={classes.divider}></hr>
            <form className={classes.form} onSubmit={submitHandler}>
            {error && <Message type='danger' msg={error} />}
            
                    <InputV2
                        inputCasingStyle="input-create"
                        name="Title"
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                        placeholder=""
                        content="Name:"
                        required
                    />
                    <InputV2
                        inputCasingStyle="input-create"
                        name="Type"
                        value={type}
                        onChange={(e) => setType(e.currentTarget.value)}
                        placeholder=""
                        content="Type:"
                        required
                    />                    
                    <InputV2
                        inputCasingStyle="input-create"
                        name="Description"
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                        placeholder=""
                        content="Description:"
                        required
                    />
                    <div className={classes.urlHide}>
                        <InputV2
                            inputCasingStyle="input-create"
                            name="Avatar"
                            type="hidden"
                            value={avatar}
                            content=""
                        /> 
                    </div>         
                    <div className={classes.currencyWrapper}>          
                        <div className={classes.currencyInput}>
                            <CurrencyFormat
                            className={classes.currency} 
                            name="Price"
                            value={price}
                            thousandSeparator={true} 
                            prefix={'£'} 
                            step={0.01}
                            maxLength="7"
                            onValueChange={(values: any) => {
                                const {formattedValue, value} = values;
                                if(formattedValue.length <= 7){
                                setPrice(formattedValue);
                                }}}
                            />
                            <div className={classes.underline}></div>
                            <label>Price</label>
                        </div>
                    </div>
                    <select className={classes.select} name="Reduced" required onChange={reducedHandler}>
                        <option selected disabled defaultValue="Regular price">Reduced?</option>
                        <option defaultValue="Regular price">Regular price</option>
                        <option defaultValue="Reduced price">Reduced price</option>
                    </select>
                    {!reduced ?
                        null
                    :
                        <div className="reduced">
                            <div className={classes.currencyWrapper}>
                                <div className={classes.currencyInput}>
                                    <CurrencyFormat
                                        className={classes.currency} 
                                        name="old_price"
                                        value={old_price}
                                        thousandSeparator={true} 
                                        prefix={'£'} 
                                        step={0.01}
                                        maxLength="7"
                                        onValueChange={(values: any) => {
                                            const {formattedValue, value} = values;
                                            if(formattedValue.length <= 7){
                                            setOldPrice(formattedValue);
                                        }}}
                                    />
                                    <div className={classes.underline}></div>
                                    <label>Old Price</label>
                                </div>
                            </div>
                            <div className={classes.currencyWrapper}>
                                <div className={classes.currencyInput}>
                                    <CurrencyFormat
                                        className={classes.currency} 
                                        name="new_price"
                                        value={price}
                                        thousandSeparator={true} 
                                        prefix={'£'} 
                                        step={0.01}
                                        maxLength="7"
                                        onValueChange={(values: any) => {
                                            const {formattedValue, value} = values;
                                            if(formattedValue.length <= 7){
                                            setNewPrice(formattedValue);
                                        }}}
                                    />
                                    <div className={classes.underline}></div>
                                    <label>New Price</label>
                                </div>
                            </div>
                        </div>  
                    }
                    <button id={style["submit"]} className={style["custom-btn"]} disabled={loading }>{loading ? "Loading..." : "Submit"}</button>
            </form>
        </div>
    );
}

export default Create;