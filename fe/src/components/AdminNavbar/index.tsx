'use client'

import { adminNav } from "@/config/nav";
import Logo from "../Logo";
import { CiCircleChevLeft, CiGrid2H, CiGrid41, CiMenuBurger } from 'react-icons/ci';
import { useState } from 'react';
import clsx from 'clsx';
import { nav } from '@/types';
import { baseUrl } from '@/libs/base-url';
import Link from 'next/link';
import { FaChevronLeft, FaFolder, FaRectangleList } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';

export default function AdminNavbar() 
{
  const [isShowingMobileMenu, setIsShowingMobileMenu] = useState(false)
  const pathname = usePathname()

  const renderNav = (navigations: nav, isSub = false) =>
  {
    return Object.values(navigations).map(nav =>
    {      
      return <li key={nav.label} className={clsx('py-3 rounded-xl', nav.subNav && 'bg-[#1D2939] pt-5', (isSub && pathname.includes(nav.path)) && 'bg-[#9FF443] text-foreground', !pathname.includes(nav.path) && 'text-[#ffffff50]')}>
        <Link href={baseUrl(nav.path)} className={clsx('flex gap-4 items-center px-3', (!isSub && nav.subNav) && 'pb-3')}>
          {
            isSub ?
              <CiGrid41 size={24} />
            :
              <FaFolder size={24} className={clsx(pathname.includes(nav.path) ? 'text-white' : 'text-[#ffffff50]')} />
          }
          {nav.label}
        </Link>
        {
          ('subNav' in nav && nav.subNav) ?
            <ul>
              {
                renderNav(nav.subNav, true)
              }
            </ul>
          :
            null
        }
      </li>  
    })
  }

  return (
    <>
      <nav className={clsx(
        'w-[256px] p-6 bg-foreground text-background absolute md:static left-0 top-0 bottom-0 rounded-[32px]',
        isShowingMobileMenu ? 'block' : 'hidden lg:block'
      )}>
        <div className='flex justify-end block lg:hidden'>
          <button onClick={() => setIsShowingMobileMenu(false)}>
            <CiCircleChevLeft size={32} />
          </button>
        </div>
        <div className='pb-4 flex justify-between'>
          <div className='h-[21px]'>
            <Logo url={baseUrl('/admin')} />
          </div>
          <FaChevronLeft />
        </div>
        <ul className='mt-4 font-semibold'>
          {
            renderNav(adminNav as nav)
          }
        </ul>
      </nav>
      <button onClick={() => setIsShowingMobileMenu(true)} className='md:hidden ml-4 mt-4'>
        <CiMenuBurger size={32} />
      </button>
    </>
  );
}
