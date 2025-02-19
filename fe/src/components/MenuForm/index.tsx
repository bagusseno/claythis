'use client'

import Form, { FormRow, FormRowCaption, FormRowContent, FormRowLabel } from '../Form'
import { useForm } from 'react-hook-form'
import {  useEffect } from 'react'
import { Menu } from '@/types'
import toast from 'react-hot-toast'
import { toastError } from '@/libs/error-toaster'
import Button from '../Button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchMenus } from '@/redux/features/menu/menuSlice'

export default function MenuForm()
{
  const { setValue, register, trigger, getValues, reset, formState } = useForm<Menu>({mode: 'all'})
	const {menus, selectedMenu} = useAppSelector(state => state.menu)
	const dispatch = useAppDispatch()

	useEffect(() =>
	{
		if(selectedMenu)
		{
			setValue('name', selectedMenu.name)
			setValue('children', selectedMenu.children)
			setValue('parent', selectedMenu.parent)
			setValue('parent_id', selectedMenu.parent_id)
			setValue('id', selectedMenu.id)
		}
		else
		{
			reset()
		}

	}, [selectedMenu])


  const submit = async () =>
  {
    const isValid = await trigger(undefined, {shouldFocus: true})

    if(!isValid) return toast.error('Form is still incorrect.')

		const data = getValues()

		if(data.parent_id == '')
			data.parent_id = undefined

		delete data.children
		delete data.depth
		delete data.expanded
		delete data.parent

    try 
    {
      if(!selectedMenu)
			{
				fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menus`, {
					method: 'POST',
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => res.json())
				.then(() => 
				{
					reset()
					toast.success('Succeed adding menu.')
					dispatch(fetchMenus())
				})
			}
			else
			{
				fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menus/${selectedMenu.id}`, {
					method: 'PUT',
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => res.json())
				.then(() => 
				{
					reset()
					toast.success('Succeed updating menu.')
					dispatch(fetchMenus())
				})
			}
    }
    catch(e)
    {
      console.error(e)
      
      if(!selectedMenu)
        toastError('Failed adding menu!', e)
      else
        toastError('Failed updating menu!', e)
    }    
  }

  return (
    <Form onSubmit={(e) => e.preventDefault()} className='min-w-[512px]'>
			{
				selectedMenu &&
					<>
						<FormRow>
							<FormRowLabel>
								ID
							</FormRowLabel>
							<FormRowContent>
								<input 
									readOnly
									type="text" 
									{...register('id', {
										required: true,
									})}
								/>
							</FormRowContent>
						</FormRow>
						<FormRow>
							<FormRowLabel>
								Depth
							</FormRowLabel>
							<FormRowContent>
								<input type="text" value={selectedMenu?.parent_id ? selectedMenu?.depth : 0} readOnly />
							</FormRowContent>
						</FormRow>
					</>
			}
			<FormRow>
				<FormRowLabel>
					Parent
				</FormRowLabel>
        <FormRowContent>
          <select {...register('parent_id')}>
						<option value="">
							None
						</option>
						{menus.map(menu => (
							<option key={menu.id} value={menu.id}>
								{menu.name}
							</option>
						))}
					</select>   
        </FormRowContent>
      </FormRow> 
			<FormRow>
        <FormRowLabel>
          Name
        </FormRowLabel>
        <FormRowContent>
          <input type="text" {...register('name', {required: true})} />
        </FormRowContent>
        {
          formState.errors.name && 
            <FormRowCaption type='error'>
              Required
            </FormRowCaption>
        }
      </FormRow>
      <FormRow submit>
        <FormRowContent className='flex gap-4 justify-end'>
          <Button onClick={() => submit()} className='w-full'>
            {selectedMenu ? 'Save' : 'Create'}
          </Button>
        </FormRowContent>
      </FormRow>
    </Form>
  )
}