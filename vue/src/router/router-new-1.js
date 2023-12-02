import { createRouter, createWebHashHistory } from 'vue-router'
import { watchEffect, ref } from 'vue'
import store from "../stores";

// Admin Dashboard
import AdminHome from '@/views/admin/HomeView.vue'
import UserView from '@/views/admin/UserView.vue'
import UserForm from '@/views/admin/UserForm.vue'
import ApointmentScheduleView from '@/views/admin/ApointmentScheduleView.vue'
import ApointmentHistoryView from '@/views/admin/ApointmentHistoryView.vue'
import ServicesView from '@/views/admin/ServicesView.vue'
import ServiceFormView from '@/views/admin/ServiceFormView.vue'
import ReportsView from '@/views/admin/ReportsView.vue'

// Staff Dashboard
import StaffHome from '@/views/patient/HomeView.vue'

// Patient Dashboard
import PatientHome from '@/views/patient/HomeView.vue'
import BookListView from '@/views/patient/BookListView.vue'


const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    meta: { requiresAuth: true },
    children: [
      {
        meta: {
          title: 'Dashboard'
        },
        path: '/dashboard',
        name: 'dashboard',
        component: PatientHome
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
          title: 'Services'
        },
        path: '/services',
        name: 'services',
        component: ServicesView
      },
      {
        meta: {
          title: 'Add Service'
        },
        path: '/add-service',
        name: 'add-service',
        component: ServiceFormView
      },
      {
        meta: {
          title: 'Edit Service'
        },
        path: '/edit-service/:id',
        name: 'edit-service',
        component: ServiceFormView
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
      // Patient
      {
        meta: {
          title: 'Book List'
        },
        path: '/book-list',
        name: 'book-list',
        component: BookListView
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
