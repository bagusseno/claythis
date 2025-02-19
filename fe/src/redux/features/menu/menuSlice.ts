import { Menu } from '@/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface MenuState {
	menus: Menu[]
	organizedMenus: Menu[]
	selectedMenu: Menu | null
	selectedRootMenu: Menu | null
}

const initialState: MenuState = {
	menus: [],
	organizedMenus: [],
	selectedRootMenu: null,
	selectedMenu: null
}

export const fetchMenus = createAsyncThunk("menus/get", async () => {
  // Here you can use axios with your own api
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menus`)
  const json = await response.json()
  return json;
});

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedRootMenu: (state, action) => 
		{
    	state.selectedRootMenu = action.payload
    },
    setSelectedMenu: (state, action) => 
		{
      state.selectedMenu = action.payload
    },
		expandMenu: (state, action) =>
		{
			const menuIndex = state.menus.findIndex(menu => menu.id == action.payload.id)

			if(menuIndex == -1) return

			state.menus[menuIndex].expanded = action.payload.status
			state.organizedMenus = organizeMenus(state.menus)
			state.selectedRootMenu = state.organizedMenus.find(menu => menu.id == state.selectedRootMenu?.id) ?? state.selectedRootMenu
		}
  },
	extraReducers: (builder) => {
    builder.addCase(fetchMenus.fulfilled, (state, action) => {
      state.menus = action.payload;
			state.organizedMenus = organizeMenus(state.menus)

			// update selectedRootMenu
			if(state.selectedRootMenu)
			{
				state.selectedRootMenu = state.organizedMenus.find(menu => menu.id == state.selectedRootMenu?.id) ?? state.selectedRootMenu
			}
    })
  }
})

// Action creators are generated for each case reducer function
export const { setSelectedMenu, setSelectedRootMenu, expandMenu } = menuSlice.actions

export default menuSlice.reducer

const organizeMenus = (menus: Menu[]) =>
{
	// update organizedMenus
	const menuMap = new Map(menus.map(menu => 
	{
		const menuWithChildren: Menu = {
			...menu,
			depth: 0,
			children: []
		}
		return [menu.id, menuWithChildren]
	}));

	const organizedMenus: any[] = [];

	menus.forEach(menu => 
	{
		if(!menu.depth && !menu.parent_id)
		{
			menu.depth = 0
		}

		if (menu.parent_id) {
			const subMenu = menuMap.get(menu.id)		
			const parentMenu = menuMap.get(menu.parent_id)	

			if(subMenu && parentMenu)
			{
				subMenu.depth = (parentMenu.depth ?? 0) + 1
				parentMenu.children?.push(subMenu);
			}
		} else {
			organizedMenus.push(menuMap.get(menu.id));
		}
	});
	
	return organizedMenus
}