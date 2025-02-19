import clsx from 'clsx';
import { HTMLAttributes } from 'react';

interface props extends HTMLAttributes<HTMLLabelElement> {
    containerProps?: HTMLAttributes<HTMLDivElement>
}

export default function FormRowLabel({className, containerProps, children, ...restProps}: props)
{
    return (
        <div {...containerProps}>
            <label className={clsx(className, 'font-semibold')} {...restProps}>
                {children}
            </label>
        </div>
    )
}