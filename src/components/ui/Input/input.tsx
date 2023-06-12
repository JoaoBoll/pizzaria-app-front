import { InputHTMLAttributes } from 'react';
import styles from './style.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{};
interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement>{};

export function Input({...rest}:InputProps){
    return (
        <input className={styles.input} {...rest}/>
    )
}

export function TextArea({...rest}:TextAreaProps){
    return (
        <textarea className={styles.textarea} {...rest}></textarea>
    )
}