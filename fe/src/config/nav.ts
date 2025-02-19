import { nav, navItem } from "@/types";

export const adminNav = {
  systems: {
    path: '/systems',
    label: 'Systems',
    subNav: {
      systemCode: {
        path: '/code',
        label: 'System code',        
      },
      properties: {
        path: '/properties',
        label: 'Properties',        
      },
      menus: {
        path: '/menus',
        label: 'Menus',        
      },
      apiList: {
        path: '/api-list',
        label: 'API List',        
      },
    },    
  },
  usersAndGroup: {
    path: '/users-and-groups',
    label: 'Users & Groups'
  },
  competition: {
    path: '/competition',
    label: 'Competition'
  }
}

function iterate(navigations: nav)
{  
  Object.values(navigations).forEach((nav: navItem) => 
  {    

    if(nav.subNav)
    {
      Object.values(nav.subNav).forEach((subNav: navItem) =>
      {        
        if(typeof subNav.path == 'string')
          subNav.path = nav.path + subNav.path
      })
      
      iterate(nav.subNav as nav)
    }
  })
}

iterate(adminNav as nav)