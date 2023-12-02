import { createRouter, createWebHashHistory } from 'vue-router'
import { computed, ref, watchEffect } from 'vue'
import store from "../stores";

//Global
import ProfileView from '@/views/ProfileView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BlankView from '@/views/BlankView.vue'

// Admin Dashboard
import AdminHome from '@/views/AdminHomeView.vue'
import UserView from '@/views/UserView.vue'
import UserForm from '@/views/UserForm.vue'
import ApointmentScheduleView from '@/views/ApointmentScheduleView.vue'
import ApointmentHistoryView from '@/views/ApointmentHistoryView.vue'
import ServicesView from '@/views/ServicesView.vue'
import ServiceFormView from '@/views/ServiceFormView.vue'
import ReportsView from '@/views/ReportsView.vue'
import RoleView from '@/views/RoleView.vue'
import RoleFormView from '@/views/RoleFormView.vue'

// Staff Dashboard
import StaffHome from '@/views/StaffHomeView.vue'
import StaffAppointmentsList from '@/views/AppointmentListView.vue'
import StaffAppointmentsSchedule from '@/views/AppointmentScheduleView.vue'
// import StaffSchedule from '@/views/staff/ScheduleView.vue'

// Patient Dashboard
import PatientHome from '@/views/PatientHomeView.vue'
import BookListView from '@/views/patient/BookListView.vue'
import BookAppointmentFormView from '@/views/patient/BookAppointmentFormView.vue'


const routes = [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    name: "admin",
    component: DefaultLayout,
    meta: { isAdmin: true, requiresAuth: true },
    children: [
      {
        meta: {
          title: 'Dashboard'
        },
        path: '/admin/dashboard',
        name: 'admin-dashboard',
        component: StaffHome
      },
      {
        meta: {
          title: 'Profile'
        },
        path: '/admin/profile',
        name: 'admin-profile',
        component: ProfileView
      },
      {
        meta: {
          title: 'User',
        },
        path: '/admin/user',
        name: 'admin-user',
        component: UserView
      },
      {
        meta: {
          title: 'Add User'
        },
        path: '/admin/add-user',
        name: 'admin-add-user',
        component: UserForm
      },
      { 
        meta: {
          title: 'Edit User'
        },
        path: "/admin/edit-user/:id", 
        name: "admin-edit-user", 
        component: UserForm 
      },
      // Appointments
      {
        meta: {
          title: 'Appointments'
        },
        path: '/admin/appointments-list',
        name: 'admin-appointments-list',
        component: StaffAppointmentsList
      },
      {
        meta: {
          title: 'Schedules'
        },
        path: '/admin/appointments-schedule',
        name: 'admin-appointments-schedule',
        component: StaffAppointmentsSchedule
      },
      // {
      //   meta: {
      //     title: 'Appointment Schedule'
      //   },
      //   path: '/admin/appointment-schedule',
      //   name: 'admin-appointment-schedule',
      //   component: ApointmentScheduleView
      // },
      {
        meta: {
          title: 'Appointment History'
        },
        path: '/admin/appointment-history',
        name: 'admin-appointment-history',
        component: ApointmentHistoryView
      },
      // roles
      {
        meta: {
          title: 'Roles'
        },
        path: '/admin/roles',
        name: 'admin-roles',
        component: RoleView
      },
      {
        meta: {
          title: 'Add Role'
        },
        path: '/admin/add-role',
        name: 'admin-add-role',
        component: RoleFormView
      },
      {
        meta: {
          title: 'Edit Role'
        },
        path: '/admin/edit-role/:id',
        name: 'admin-edit-role',
        component: RoleFormView
      },
      // services
      {
        meta: {
          title: 'Services'
        },
        path: '/admin/services',
        name: 'admin-services',
        component: ServicesView
      },
      {
        meta: {
          title: 'Add Service'
        },
        path: '/admin/add-service',
        name: 'admin-add-service',
        component: ServiceFormView
      },
      {
        meta: {
          title: 'Edit Service'
        },
        path: '/admin/edit-service/:id',
        name: 'admin-edit-service',
        component: ServiceFormView
      },
      {
        meta: {
          title: 'Reports'
        },
        path: '/admin/reports',
        name: 'admin-reports',
        component: ReportsView
      },
      //
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
    path: "/staff",
    redirect: "/staff/dashboard",
    name: "staff",
    component: DefaultLayout,
    meta: { isStaff: true, requiresAuth: true},
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
          title: 'Profile'
        },
        path: '/staff/profile',
        name: 'staff-profile',
        component: ProfileView
      },
      {
        meta: {
          title: 'Appointments'
        },
        path: '/staff/appointments-list',
        name: 'staff-appointments-list',
        component: StaffAppointmentsList
      },
      {
        meta: {
          title: 'Schedules'
        },
        path: '/staff/appointments-schedule',
        name: 'staff-appointments-schedule',
        component: BlankView
      },
      {
        meta: {
          title: 'Appointments History'
        },
        path: '/staff/appointments-history',
        name: 'staff-appointments-history',
        component: BlankView
      },
      // services
      {
        meta: {
          title: 'Services'
        },
        path: '/staff/services',
        name: 'staff-services',
        component: ServicesView
      },
      {
        meta: {
          title: 'Add Service'
        },
        path: '/staff/add-service',
        name: 'staff-add-service',
        component: ServiceFormView
      },
      {
        meta: {
          title: 'Edit Service'
        },
        path: '/staff/edit-service/:id',
        name: 'staff-edit-service',
        component: ServiceFormView
      },
      {
        meta: {
          title: 'Reports'
        },
        path: '/staff/reports',
        name: 'staff-reports',
        component: ReportsView
      },
      // {
      //   meta: {
      //     title: 'Schedules'
      //   },
      //   path: '/staff/schedule',
      //   name: 'staff-schedule',
      //   component: StaffSchedule
      // },
    ],
  },
  {
    path: "/",
    redirect: "/dashboard",
    name: "patient",
    component: DefaultLayout,
    meta: { isPatient: true, requiresAuth: true },
    children: [
      {
        meta: {
          title: 'Patient Dashboard'
        },
        path: '/dashboard',
        name: 'patient-dashboard',
        component: PatientHome
      },
      {
        meta: {
          title: 'Profile'
        },
        path: '/profile',
        name: 'profile',
        component: ProfileView
      },
      {
        meta: {
          title: 'Book List',
        },
        path: '/book-list',
        name: 'book-list',
        component: BookListView
      },
      {
        meta: {
          title: 'Book Appointment',
        },
        path: '/book-appointment',
        name: 'book-appointment',
        component: BookAppointmentFormView
      },
      {
        meta: {
          title: 'Book Appointment Form',
        },
        path: '/book-appointment-form',
        name: 'book-appointment-form',
        component: BookAppointmentFormView
      },
      {
        meta: {
          title: 'Book Schedules'
        },
        path: '/schedules',
        name: 'patient-schedules',
        component: ApointmentHistoryView
      },
      {
        meta: {
          title: 'Appointments History'
        },
        path: '/history',
        name: 'patient-history',
        component: ApointmentHistoryView
      },
      //
      // {
      //   meta: {
      //     title: 'Tables'
      //   },
      //   path: '/datepicker',
      //   name: 'datepicker',
      //   component: () => import('@/views/patient/DatePickerComponent.vue')
      // },
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
      title: 'Not Found'
    },
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  },
  {
    meta: {
      title: 'Error'
    },
    path: '/error',
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
    next({ name: "login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: `${store.state.user.role}-dashboard`})
  } else if ((store.state.user.role != 'admin') && to.meta.isAdmin) {
    next({ name: `${store.state.user.role}-dashboard`})
  } else if ((store.state.user.role != 'staff') && to.meta.isStaff) {
    next({ name: `${store.state.user.role}-dashboard`})
  } else if ((store.state.user.role != 'patient') && to.meta.isPatient) {
    next({ name: `${store.state.user.role}-dashboard`})
  } else {
    next();
  }
});


export default router
