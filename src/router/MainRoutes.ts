const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main/dashboard/default',
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  children: [
    {
      name: 'Starter',
      path: '/',
      component: () => import('@/views/StarterPage.vue')
    },
    {
      name: 'NewBrand',
      path: '/brands/create',
      component: () => import('@/views/Brand/Create.vue')
    },
    {
      name: 'UpdateBrand',
      path: '/brands/:id',
      component: () => import('@/views/Brand/Edit.vue')
    },
    {
      name : 'BrandList',
        path : '/brands',
        component : () => import('@/views/Brand/List.vue'),
    }
  ]
};

export default MainRoutes;
