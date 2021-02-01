import React, { FC, ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';
import classes from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text: string;
    className?: string;
}

const Button: FC<ButtonProps> = ({ text, className, onClick, type, disabled }) => {
    return(
        <button id={styles["button"]} type={type} className={[classes.button].join(className)} onClick={onClick} disabled={disabled}>{text}</button>
    );
}

export default Button;