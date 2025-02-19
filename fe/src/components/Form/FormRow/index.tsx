import clsx from 'clsx';
import { HTMLAttributes } from 'react';

interface props extends HTMLAttributes<HTMLDivElement> {
    submit?: boolean
}

export default function FormRow({className, children, submit = false, ...restProps}: props)
{
    return (
        <div className={clsx(className, submit ? 'mt-8' : 'form-row')} {...restProps}>
            {children}
        </div>
    )
}