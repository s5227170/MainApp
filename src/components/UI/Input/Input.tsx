import React, { FC, InputHTMLAttributes } from 'react';

import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input: FC<InputProps> = ({className, type, placeholder, value, name, step, onChange, label}) => {
    return(
        <div className="field">
            <div className="control">
                {label.split(" ")[0]=="h1"?
                    <h3 className={className} >{label.slice(3)}</h3>
                :
                    <label className={className} htmlFor={name}>{label}</label>
                }
                <input 
                    className="input"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    id={name}
                    onChange={onChange}
                    required
                    autoComplete="off"
                    step={step}
                />
            </div>
        </div>
    );
}

export default Input;