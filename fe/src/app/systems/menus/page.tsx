'use client'

import AdminLayout from '@/components/AdminLayout';
import MenuForm from '@/components/MenuForm';
import { expandMenu, fetchMenus, setSelectedMenu, setSelectedRootMenu } from '@/redux/features/menu/menuSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Menu } from '@/types';
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
          <select className='min-w-[256px]' onChange={e => dispatch(setSelectedRootMenu(organizedMenus.find(menu => menu.id == e.target.value) ?? null))}>
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
      <div className='flex gap-16 mt-10'>
        {
          selectedRootMenu &&
            <div>
              <RenderMenu menu={selectedRootMenu} />
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
        menu.parent && <div className='ml-[6px] h-[16px] w-[16px] border-l-[1px] border-b-[1px] border-black' />
      }
      <div>
        <div className='flex gap-4 items-center cursor-pointer hover:underline' onClick={() => 
        {
          dispatch(expandMenu({id: menu.id, status: !menu.expanded}))
          dispatch(setSelectedMenu(menu))
        }}>        
          {
            (menu.children && (menu.children.length > 0)) &&
              (menu.expanded ?
                <FaChevronUp size={12} />
              :
                <FaChevronDown size={12} />)
          }
          {menu.name}
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