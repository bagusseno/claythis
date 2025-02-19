import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ className, children, ...restProps }: Props) {
  return <button className={
    clsx(
      'py-[10px] px-4 rounded-full text-white font-semibold hover:opacity-80 disabled:opacity-50 bg-[#253BFF]', 
      className
    )} 
    {...restProps}
  >
    {children}
  </button>;
}
