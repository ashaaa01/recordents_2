import { createRouter, createWebHashHistory } from 'vue-router'

import Style from '@/views/StyleView.vue'
import Home from '@/views/HomeView.vue'
import UserView from '@/views/UserView.vue'
import UserForm from '@/views/UserForm.vue'
import ApointmentScheduleView from '@/views/ApointmentScheduleView.vue'
import ApointmentHistoryView from '@/views/ApointmentHistoryView.vue'
import ReportsView from '@/views/ReportsView.vue'

import store from "../stores";

const routes = [
  // {
  //   path: "/",
  //   redirect: "/dashboard",
  //   meta: { requiresAuth: true },
  //   children: [
  //     {
  //       meta: {
  //         title: 'Select style'
  //       },
  //       path: '/styles',
  //       name: 'style',
  //       component: Style
  //     },
  //     {
  //       meta: {
  //         title: 'Dashboard'
  //       },
  //       path: '/dashboard',
  //       name: 'dashboard',
  //       component: Home
  //     },
  //     {
  //       meta: {
  //         title: 'User'
  //       },
  //       path: '/user',
  //       name: 'user',
  //       component: UserView
  //     },
  //     {
  //       meta: {
  //         title: 'Add User'
  //       },
  //       path: '/add-user',
  //       name: 'add-user',
  //       component: UserForm
  //     },
  //     { 
  //       meta: {
  //         title: 'Edit User'
  //       },
  //       path: "/edit-user/:id", 
  //       name: "edit-user", 
  //       component: UserForm 
  //     },
  //     {
  //       meta: {
  //         title: 'Apointment Schedule'
  //       },
  //       path: '/apointment-schedule',
  //       name: 'apointment-schedule',
  //       component: ApointmentScheduleView
  //     },
  //     {
  //       meta: {
  //         title: 'Apointment History'
  //       },
  //       path: '/apointment-history',
  //       name: 'apointment-history',
  //       component: ApointmentHistoryView
  //     },
  //     {
  //       meta: {
  //         title: 'Reports'
  //       },
  //       path: '/reports',
  //       name: 'reports',
  //       component: ReportsView
  //     },
  //     {
  //       meta: {
  //         title: 'Tables'
  //       },
  //       path: '/tables',
  //       name: 'tables',
  //       component: () => import('@/views/TablesView.vue')
  //     },
  //     {
  //       meta: {
  //         title: 'Forms'
  //       },
  //       path: '/forms',
  //       name: 'forms',
  //       component: () => import('@/views/FormsView.vue')
  //     },
  //     {
  //       meta: {
  //         title: 'Profile'
  //       },
  //       path: '/profile',
  //       name: 'profile',
  //       component: () => import('@/views/ProfileView.vue')
  //     },
  //     {
  //       meta: {
  //         title: 'Ui'
  //       },
  //       path: '/ui',
  //       name: 'ui',
  //       component: () => import('@/views/UiView.vue')
  //     },
  //     {
  //       meta: {
  //         title: 'Responsive layout'
  //       },
  //       path: '/responsive',
  //       name: 'responsive',
  //       component: () => import('@/views/ResponsiveView.vue')
  //     },
  //   ],
  // },
  {
    path: '/',
    name: 'admin',
    redirect: '/dashboard',
    component: () => import('@/layouts/LayoutAdmin.vue'), // Replace with your Admin component
    meta: { requiresAuth: true, userType: 'Admin', isGuest: false },
    children: [
      {
        meta: {
          title: 'Select style'
        },
        path: '/styles',
        name: 'style',
        component: Style
      },
      {
        meta: {
          title: 'Dashboard'
        },
        path: '/dashboard',
        name: 'dashboard',
        component: Home
      },
      {
        meta: {
          title: 'User'
        },
        path: '/user',
        name: 'user',
        component: UserView
      },
      {
        meta: {
          title: 'Add User'
        },
        path: '/add-user',
        name: 'add-user',
        component: UserForm
      },
      { 
        meta: {
          title: 'Edit User'
        },
        path: "/edit-user/:id", 
        name: "edit-user", 
        component: UserForm 
      },
      {
        meta: {
          title: 'Apointment Schedule'
        },
        path: '/apointment-schedule',
        name: 'apointment-schedule',
        component: ApointmentScheduleView
      },
      {
        meta: {
          title: 'Apointment History'
        },
        path: '/apointment-history',
        name: 'apointment-history',
        component: ApointmentHistoryView
      },
      {
        meta: {
          title: 'Reports'
        },
        path: '/reports',
        name: 'reports',
        component: ReportsView
      },
      {
        meta: {
          title: 'Tables'
        },
        path: '/tables',
        name: 'tables',
        component: () => import('@/views/TablesView.vue')
      },
      {
        meta: {
          title: 'Forms'
        },
        path: '/forms',
        name: 'forms',
        component: () => import('@/views/FormsView.vue')
      },
      {
        meta: {
          title: 'Profile'
        },
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/ProfileView.vue')
      },
      {
        meta: {
          title: 'Ui'
        },
        path: '/ui',
        name: 'ui',
        component: () => import('@/views/UiView.vue')
      },
      {
        meta: {
          title: 'Responsive layout'
        },
        path: '/responsive',
        name: 'responsive',
        component: () => import('@/views/ResponsiveView.vue')
      },
    ],
  },
  {
    path: '/staff',
    name: 'staff',
    component: () => import('@/layouts/LayoutStaff.vue'), // Replace with your Staff component
    meta: { requiresAuth: true, userType: 'Staff', isGuest: false },
    children: [
      {
        meta: {
          title: 'Select style'
        },
        path: '/styles',
        name: 'style',
        component: Style
      },
      {
        meta: {
          title: 'Apointment Schedule'
        },
        path: '/apointment-schedule',
        name: 'apointment-schedule',
        component: ApointmentScheduleView
      },
      {
        meta: {
          title: 'Profile'
        },
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/ProfileView.vue')
      },
      {
        meta: {
          title: 'Reports'
        },
        path: '/reports',
        name: 'reports',
        component: ReportsView
      },
    ],
  },
  {
    path: '/patient',
    name: 'patient',
    component: () => import('@/layouts/LayoutPatient.vue'), // Replace with your Patient component
    meta: { requiresAuth: true, userType: 'Patient', isGuest: false },
    children: [
      {
        meta: {
          title: 'Select style'
        },
        path: '/styles',
        name: 'style',
        component: Style
      },
      {
        meta: {
          title: 'Apointment Schedule'
        },
        path: '/apointment-schedule',
        name: 'apointment-schedule',
        component: ApointmentScheduleView
      },
      {
        meta: {
          title: 'Profile'
        },
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/ProfileView.vue')
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "auth",
    meta: {isGuest: true},
    children: [
      {
        meta: {
          title: 'Login'
        },
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue')
      },
      // {
      //   meta: {
      //     title: 'Login'
      //   },
      //   path: '/login',
      //   name: 'login',
      //   component: () => import('@/views/RegisterView.vue')
      // },
    ],
  },
  {
    meta: {
      title: 'Error'
    },
    path: '/:catchAll(.*)',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !store.state.user.token) {
//     next({ name: "login" });
//   } else if (store.state.user.token && to.meta.isGuest) {
//     next({ name: "dashboard" });
//   } else {
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: 'login' });
  } else if (store.state.user.token) {
    if (to.meta.userType === 'Admin' && store.state.user.data.role === 'Admin' && to.meta.isGuest) {
      next({ name: 'admin' });
    } else if (to.meta.userType === 'Staff' && store.state.user.data.role === 'Staff' && to.meta.isGuest) {
      next({ name: 'staff' });
    } else if (to.meta.userType === 'Patient' && store.state.user.data.role === 'Patient' && to.meta.isGuest) {
      next({ name: 'patient' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
