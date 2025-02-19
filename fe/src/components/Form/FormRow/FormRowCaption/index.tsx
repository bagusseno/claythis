import clsx from 'clsx';
import { HTMLAttributes } from 'react';

type props = {
    type?: 'default' | 'error'
}

export default function FormRowCaption({className, children, type = 'default', ...restProps}: HTMLAttributes<HTMLDivElement> & props)
{
    return (
        <div className={clsx(className, 'mt-1u text-sm font-semibold', type == 'error' ? '!text-[red]' : 'color-text-secondary')} {...restProps}>
            {children}
        </div>
    )
}