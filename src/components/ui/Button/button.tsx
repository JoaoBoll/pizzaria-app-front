import styles from './style.module.scss'
import { ButtonHTMLAttributes, ReactNode } from 'react';
import {FaSpinner} from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    Loading?: boolean;
    children: ReactNode,
}

export function Button({Loading, children, ...rest}:ButtonProps) {
    return (
        <button className={styles.button} disabled={Loading} {...rest}>

            {Loading? (
                <FaSpinner color='#FFF' size={16}/>
            ):(
                <a className={styles.buttonText}>{children}</a>
            )}
        
        </button>
    )
}