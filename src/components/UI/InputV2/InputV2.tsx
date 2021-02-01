import React, {  FC, InputHTMLAttributes } from 'react';

import './InputV2.css';

interface InputV2Props extends InputHTMLAttributes<HTMLInputElement>{
    content: string;
    inputCasingStyle: string;  
}

const InputV2: FC<InputV2Props> = ({disabled, id, inputCasingStyle, type, value, name, step, onBlur, onChange, content}) => {
    return(
            <div id={inputCasingStyle} className="inputv2-wrapper">
                <div className="inputv2-input-data">
                    <input 
                        id={id}
                        type={type}
                        name={name}
                        autoComplete="off"
                        value={value}
                        onBlur={onBlur}  
                        onChange={onChange}
                        required
                        step={step} 
                        disabled={disabled}
                    />  
                    <div className="inputv2-underline"></div>    
                    <label >{content}</label>  
                </div>
            </div>
            
    );
}

export default InputV2;