import clsx from 'clsx';
import styles from './index.module.css';
import FormRow from './FormRow';
import FormRowCaption from './FormRow/FormRowCaption';
import FormRowContent from './FormRow/FormRowContent';
import FormRowLabel from './FormRow/FormRowLabel';
import { FormHTMLAttributes } from 'react';

interface props extends FormHTMLAttributes<HTMLFormElement> {
    fullWidth?: boolean
}

export default function Form({className, children, fullWidth = false, ...restProps}: props)
{
    return (
        <form 
            className={clsx(
                className, 
                styles.form, 
                fullWidth ? `${styles['full-width']}` : 'max-w-[512px]',
                'md:[&_:is(input,textarea,select)]:w-full w-full'
            )} 
            {...restProps}
        >
            {children}
        </form>
    )
}

export {
    FormRow,
    FormRowCaption,
    FormRowContent,
    FormRowLabel
};