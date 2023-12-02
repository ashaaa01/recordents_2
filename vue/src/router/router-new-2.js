import { createRouter, createWebHashHistory } from 'vue-router'
import { watchEffect, ref } from 'vue'
import store from "../stores";

// Global
import ProfileView from '@/views/ProfileView.vue'

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
    path: "/admin/",
    redirect: "/admin/dashboard",
    name: "admin",
    meta: { requiresAuth: true, userType: 'Admin'},
    children: [
      {
        meta: {
          title: 'Admin Dashboard'
        },
        path: '/admin/dashboard',
        name: 'admin-dashboard',
        component: AdminHome
      },
      {
        meta: {
          title: 'User'
        },
        path: '/admin/user',
        name: 'user',
        component: UserView
      },
      {
        meta: {
          title: 'Add User'
        },
        path: '/admin/add-user',
        name: 'add-user',
        component: UserForm
      },
      { 
        meta: {
          title: 'Edit User'
        },
        path: "/admin/edit-user/:id", 
        name: "edit-user", 
        component: UserForm 
      },
      {
        meta: {
          title: 'Appointment Schedule'
        },
        path: '/admin/appointment-schedule',
        name: 'appointment-schedule',
        component: ApointmentScheduleView
      },
      {
        meta: {
          title: 'Appointment History'
        },
        path: '/admin/appointment-history',
        name: 'appointment-history',
        component: ApointmentHistoryView
      },
      {
        meta: {
          title: 'Services'
        },
        path: '/admin/services',
        name: 'services',
        component: ServicesView
      },
      {
        meta: {
          title: 'Add Service'
        },
        path: '/admin/add-service',
        name: 'add-service',
        component: ServiceFormView
      },
      {
        meta: {
          title: 'Edit Service'
        },
        path: '/admin/edit-service/:id',
        name: 'edit-service',
        component: ServiceFormView
      },
      {
        meta: {
          title: 'Reports'
        },
        path: '/admin/reports',
        name: 'reports',
        component: ReportsView
      },
      {
        meta: {
          title: 'Tables'
        },
        path: '/admin/tables',
        name: 'tables',
        component: () => import('@/views/TablesView.vue')
      },
      {
        meta: {
          title: 'Forms'
        },
        path: '/admin/forms',
        name: 'forms',
        component: () => import('@/views/FormsView.vue')
      },
      {
        meta: {
          title: 'Profile'
        },
        path: '/admin/profile',
        name: 'profile',
        component: ProfileView
      },
      {
        meta: {
          title: 'Ui'
        },
        path: '/admin/ui',
        name: 'ui',
        component: () => import('@/views/UiView.vue')
      },
      {
        meta: {
          title: 'Responsive layout'
        },
        path: '/admin/responsive',
        name: 'responsive',
        component: () => import('@/views/ResponsiveView.vue')
      },
    ],
  },
  {
    path: "/staff/",
    redirect: "/staff/dashboard",
    name: "staff",
    meta: { requiresAuth: true, userType: 'Staff'},
    children: [
      {
        meta: {
          title: 'Dashboard'
        },
        path: '/staff/dashboard',
        name: 'staff-dashboard',
        component: StaffHome
      },
      {
        meta: {
          title: 'Appointment Schedule'
        },
        path: '/staff/appointment-schedule',
        name: 'appointment-schedule',
        component: ApointmentScheduleView
      },
      {
        meta: {
          title: 'Appointment History'
        },
        path: '/staff/appointment-history',
        name: 'appointment-history',
        component: ApointmentHistoryView
      },
      {
        meta: {
          title: 'Profile'
        },
        path: '/staff/profile',
        name: 'profile',
        component: ProfileView,
      },
    ],
  },
  {
    path: "/patient/",
    redirect: "/patient/dashboard",
    name: "patient",
    meta: { requiresAuth: true, userType: 'Patient' },
    children: [
      {
        meta: {
          title: 'Dashboard'
        },
        path: '/patient/dashboard',
        name: 'patient-dashboard',
        component: PatientHome
      },
      {
        meta: {
          title: 'Appointment Schedule'
        },
        path: '/patient/appointment-schedule',
        name: 'appointment-schedule',
        component: ApointmentScheduleView
      },
      {
        meta: {
          title: 'Appointment History'
        },
        path: '/patient/appointment-history',
        name: 'appointment-history',
        component: ApointmentHistoryView
      },
      {
        meta: {
          title: 'Profile'
        },
        path: '/patient/profile',
        name: 'profile',
        component: ProfileView,
      },
      {
        meta: {
          title: 'Book List'
        },
        path: '/patient/book-list',
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
  } else if (to.meta.requireGuest && store.state.user.token) {
    // Redirect authenticated users to their respective dashboard based on role
    const userRole = store.state.user.role; // Replace with the actual role key in your store
    switch (userRole) {
      case 'admin':
        next({ name: 'admin' });
        break;
      case 'staff':
        next({ name: 'staff' });
        break;
      case 'patient':
        next({ name: 'patient' });
        break;
      default:
        next({ name: 'login' });
    }
  } else {
    next(); // Continue to the requested route
  }
});


export default router
