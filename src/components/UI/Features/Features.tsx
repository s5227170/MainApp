import React, { FC, useEffect, InputHTMLAttributes, Fragment } from 'react'
import { v4 as uuid } from 'uuid';

import InputV2 from '../InputV2/InputV2';
import "./Features.css";

interface featureProps extends InputHTMLAttributes<HTMLInputElement>{
    number: number
    ids: string
    feats?: string[]  
    featsNumber?: number
    preview: boolean
}

const Features: FC<featureProps> = ({featsNumber, feats, disabled, ids, number, onBlur, onChange, preview}) => {
    useEffect(() => {

    }, [number])

    const items = [];
    for(let i=0;i<number;i++){
        items.push(i)
    }
      
    return(
            <div>                
                {featsNumber && feats?
                    feats.map((feat, index )=> {
                        return <InputV2 
                                    id={ids.concat(index.toString())}
                                    inputCasingStyle=""
                                    className="feature-input"
                                    placeholder="Enter feature details" 
                                    value={feats[index]}
                                    type="text"
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    content="" 
                                    key={index}
                                    disabled
                                />
                    })
                :
                    null
                }
            {preview?
            <Fragment>
                <hr className="divider"></hr>
                <h3>Please re-enter current features if you wish to save them</h3>
            </Fragment>
            :
                    null
            }
            {!preview?
                items.map((feat, index ) => {
                    return <InputV2 
                                id={ids.concat(index.toString())}
                                inputCasingStyle=""
                                className="feature-input"
                                placeholder="Enter feature details" 
                                type="text"
                                onBlur={onBlur}
                                onChange={onChange}
                                content="" 
                                key={index}
                                disabled={disabled}
                            />
                })
            :
            null
            }
            <br/>
            <br/>
            </div>
        );
    } 

export default Features;