import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export default function FormRowContent({className, children, ...restProps}: HTMLAttributes<HTMLDivElement>)
{
    return (
        <div className={clsx(className, 'mt-1u')} {...restProps}>
            {children}
        </div>
    )
}