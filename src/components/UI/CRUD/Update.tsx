import React, { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import CurrencyFormat from 'react-currency-format';

import Button from '../Button/Button';
import Message from '../Message/Message';
import { RootState } from '../../../store';
import { deletefeature, setError, setfeature, settask, updateproduct } from '../../../store/actions/productActions';
import firebase from '../../../firebase/config';
import classes from './stylesheets/Update.module.scss';
import style from './stylesheets/Update.module.scss';
import { Product } from '../../../store/types';
import { useHistory } from 'react-router-dom';
import Features from '../Features/Features';
import InputV2 from '../InputV2/InputV2';

const Update: FC<Product> = (Product) => {
    //Helper states
    const [fileSelected, setFileSelected] = useState<File>();
    const [loading, setLoading] = useState(false);
    const [validationLoading, setValidationLoading] = useState(false);
    //Feature management
    //Disable inputs as validation
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(false);
    //controlls the amount of inputs and validates
    const [amount, setAmount] = useState(0);
    //helps with the validation management
    const [filled, setFilled] = useState(true);
    //input value to be dispatched
    const [currentWord, setCurrentWord] = useState("");
    //Product attributes
    const [title, setTitle] = useState(Product.title);
    const [type, setType]= useState(Product.type);
    const [description, setDescription] = useState(Product.description);
    const [avatar, setAvatar] = useState<string>(Product.avatar);
    const [price, setPrice] = useState(Product.price);
    const [reduced, setReduced] = useState(Product.reduced);
    const [old_price, setOldPrice] = useState(Product.old_price);
    const [new_price, setNewPrice] = useState(Product.new_price);
    const [features, setFeatures] = useState(0)
    const [feature_array_existing, setFeatureArray_existing] = useState(Product.feature_array)
    //
    const dispatch = useDispatch();
    const history = useHistory();
    const { error } = useSelector((state: RootState) => state.prod);
    const { id } = useSelector((state: RootState) => state.prod);
    const { feature_array } = useSelector((state: RootState) => state.prod);
    console.log(id)
    useEffect(() => {
        return () => {
            if(error) {
                dispatch(setError(''));
            }
        }
    }, [error, dispatch]);

    useEffect(() => {
        setFeatures(feature_array_existing.length);
    }, [])

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setValidationLoading(true)

        if(features < 3 || amount < 3){
            alert("You need at least 3 features in order to submit this product! If there already are 3, save themand try submitting again.")
        }else if(!Product.avatar){
            alert("Product needs to have an avatar!")
        }else{    
            //const file = fileSelected;
            const date = Product.date;
            if(fileSelected ){
                const storageRef = firebase.storage().ref('/images/');
                const fileRef = storageRef.child(fileSelected.name)
                await fileRef.put(fileSelected)
                const fileURL = await fileRef.getDownloadURL()
            setLoading(true);
        dispatch(updateproduct(id, {id: Product.id, title, type, feature_array, description, avatar: fileURL , price, reduced, old_price, new_price, date }, () => setLoading(false)));
            }else if(Product.avatar) {
                setLoading(true);
                dispatch(updateproduct(id, {id: Product.id, title, type, feature_array, description, avatar: Product.avatar, price, reduced, old_price, new_price, date }, () => setLoading(false)));
            }
        setTimeout(() => {
            history.goBack();
        }, 1500);
    }
    }

    const reducedHandler = (e: FormEvent<HTMLSelectElement>) => {
        e.preventDefault();
        if(e.currentTarget.value){
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
            setFeatures(features+1)
        }
        
    }

    const removeFeature = () => {
        if(amount > 0){
            setAmount(amount-1);
            setFeatures(features-1)
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
                <h1>Enter new product details</h1>
                <h3>Enter product features</h3>
                    <hr className={classes.divider}></hr>
                    <div className={classes.featureManagement}>
                        {/* Buttons controlling the feature amount */}
                        <button id={style["feat-btn"]} className={style["img-upld-btn"]} onClick={addFeature} disabled={!loading2}>Add Feature</button>
                        <button  className={style["img-upld-btn"]} onClick={removeFeature} disabled={loading3}>Remove Feature</button>
                        <button  className={style["img-upld-btn"]} onClick={saveFeature} disabled={!loading3}>Save Features</button>
                    </div>
                    <Features featsNumber={features} feats={Product.feature_array} ids="feats" number={amount} onBlur={inputDataHandler} preview={false} update/>

                    <br/>
                    <h3>Upload a product image</h3>
                    <hr className={classes.divider}></hr>
                    <div className={classes.imageManagement}>
                        <input id="real-file" hidden={true}  type="file" onChange={fileSelectedHandler}/>
                        <button id="custom-button" className={style["img-upld-btn"]} onClick={clickFileUpldHandler} disabled={fileSelected? true : false}>{fileSelected? "Uploaded..." : "Upload"}</button>
                        <div className={classes.imgContainer}>
                            <img className={classes.imgShowcase} src={Product.avatar} alt={Product.title + " avatar"}/>
                        </div>
                    </div>
                <h3>Set product details</h3>
                <hr className={classes.divider}></hr>
                <form className={classes.form} onSubmit={submitHandler}>
                {error && <Message type='danger' msg={error} />}
                        <InputV2
                            inputCasingStyle="input-create"
                            name="Title"
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                            placeholder=""
                            content="Title"
                            required
                        />
                        <InputV2
                            inputCasingStyle="input-create"
                            name="Type"
                            value={type}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                            placeholder=""
                            content="Type"
                            required
                        />
                        <InputV2
                            inputCasingStyle="input-create"
                            name="Description"
                            value={description}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                            placeholder=""
                            content="Description"
                            required
                        />
                        <div className={classes.urlHide}>
                        <InputV2
                            inputCasingStyle="input-create"
                            name="Avatar"
                            type="hidden"
                            content=""
                            value={avatar}
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
                            <option selected disabled>Reduced?</option>
                            <option defaultValue="">Regular price</option>
                            <option defaultValue="1">Reduced price</option>
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
                                            value={new_price}
                                            thousandSeparator={true} 
                                            prefix={'£'} 
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
                        <Button className={classes.submit} text={loading ? "Loading..." : "Submit"} disabled={loading} />
                </form>
                <div className={classes.underpageSpace}>

                </div>
            </div>
    );
}

export default Update;