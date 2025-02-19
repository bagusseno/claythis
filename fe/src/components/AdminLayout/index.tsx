'use client'

import clsx from 'clsx';
import { ReactNode } from 'react';
import AdminNavbar from '../AdminNavbar';
import { FaChevronLeft } from 'react-icons/fa6';
import Link from 'next/link';
import { CiGrid41 } from 'react-icons/ci';
import { BsGridFill } from 'react-icons/bs';

type props = {
  children: ReactNode
  title?: string
  backUrl?: string
};

export default function AdminLayout({ children, title, backUrl }: props) 
{
  return (
    <div className={clsx('p-5 h-full')}>
      <div className='flex flex-col md:flex-row bg-background h-auto min-h-[100%]'>
        <AdminNavbar />
        <main className='py-10 flex-1 px-8 min-w-0'>
          <div className='flex gap-4 items-center'>
            {
              backUrl &&
                <Link href={backUrl}>
                  <FaChevronLeft size={32} />
                </Link>
            }
            {
              title &&
                <h1 className='mb-4 text-[32px] font-bold flex gap-4 items-center'>  
                  <div className='p-4 rounded-full bg-[#253BFF]'>
                    <BsGridFill color='white' size={18} />                
                  </div>
                  {title}
                </h1>
            }
          </div>
          {
            children
          }
        </main>
      </div>
    </div>
  );
}
