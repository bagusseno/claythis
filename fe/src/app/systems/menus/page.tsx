'use client'

import AdminLayout from '@/components/AdminLayout';
import Button from '@/components/Button';
import MenuForm from '@/components/MenuForm';
import { expandAll, expandMenu, fetchMenus, setSelectedMenu, setSelectedRootMenu } from '@/redux/features/menu/menuSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Menu } from '@/types';
import clsx from 'clsx';
import { useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa6';

export default function MenusPage()
{
  const {organizedMenus, selectedRootMenu} = useAppSelector(state => state.menu)
  const dispatch = useAppDispatch()

  useEffect(() =>
  {
    dispatch(fetchMenus())

  }, [])

  return (
    <AdminLayout title='Menus'>
      <div>
        <div>
          Menu
        </div>
        <div className='flex gap-4 items-center'>
          <select className='md:min-w-[256px]' onChange={e => 
          {
            dispatch(setSelectedRootMenu(organizedMenus.find(menu => menu.id == e.target.value) ?? null))
            dispatch(setSelectedMenu(organizedMenus.find(menu => menu.id == e.target.value) ?? null))
          }}>
            <option>None</option>
            {
              organizedMenus.filter(menu => !menu.parent).map(menu =>
              (
                <option key={menu.id} value={menu.id}>
                  {menu.name}
                </option>
              ))
            }
          </select>
          <div>
            <button onClick={() => dispatch(setSelectedMenu(null))} className='p-2 rounded-full bg-[#253BFF]'>
              <FaPlus color='white' size={18} />                
            </button>
          </div>
        </div>
      </div>
      <div className='flex gap-16 mt-10 flex-wrap'>        
        {
          selectedRootMenu &&
            <div className='md:min-w-[256px]'>
              <div className='flex gap-4'>
                <div>
                  <Button className='bg-foreground text-white' onClick={() => dispatch(expandAll({status: true}))}>
                    Expand all
                  </Button>
                </div>
                <div>
                  <Button className='bg-white !text-black border-[1px] border-black' onClick={() => dispatch(expandAll({status: false}))}>
                    Collapse all
                  </Button>
                </div>
              </div>
              <div className='mt-6'>
                <RenderMenu menu={selectedRootMenu} />
              </div>
            </div>
        }
        <div>
          <MenuForm />
        </div>
      </div>
    </AdminLayout>
  )
}

const RenderMenu = ({menu}: {menu: Menu}) =>
{
  const dispatch = useAppDispatch()
  
  return (
    <div key={menu.id} className='flex gap-4'>
      {
        menu.parent && <div className={clsx('ml-[6px] h-[16px] border-l-[1px] border-b-[1px] border-black', (menu.children?.length && menu.children?.length > 0) ? 'w-[16px]' : 'w-[44px]')} />
      }
      <div>
        <div className='flex gap-4 items-center cursor-pointer hover:underline group pr-4' onClick={() => dispatch(expandMenu({id: menu.id, status: !menu.expanded}))}>         
          {
            (menu.children && (menu.children.length > 0)) &&
              (menu.expanded ?
                <FaChevronUp size={12} />
              :
                <FaChevronDown size={12} />)
          }
          <div onClick={() => 
          {            
            dispatch(setSelectedMenu({...menu, isCreatingSubMenu: false}))
          }}>
            {menu.name}
          </div>
          <button 
            onClick={(e) => 
            {
              e.stopPropagation()
              dispatch(setSelectedMenu({...menu, isCreatingSubMenu: true}))
            }} 
            className='p-2 rounded-full bg-[#253BFF] hidden group-hover:block'
          >
              <FaPlus color='white' size={12} />                
            </button>
        </div>
        {
          menu.expanded &&
            <div>
              {menu.children?.map(menu => <RenderMenu key={menu.id} menu={menu} />)}
            </div>  
        }
      </div>
    </div>
  )
}