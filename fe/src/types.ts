import { ReactElement } from 'react'

export type navItem = {
	path: string
	label: string
	url?: string
	subNav?: nav
	icon?: ReactElement
	menuVisible?: boolean
	allowedRoles?: string[]
}
  
export type nav = {
	[navName: string]: navItem
}

export type Menu = {
	id: string
	name: string
	parent_id?: string
	parent?: Menu
	expanded?: boolean
	children?: Menu[]
	depth?: number
}
