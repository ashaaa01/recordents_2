
import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact,
  mdiHistory,
  mdiCalendarArrowRight,
  mdiAccountGroupOutline,
  mdiShapeOutline 
} from '@mdi/js'

export default [
  {
    to: '/admin/dashboard',
    icon: mdiMonitor,
    label: `Dashboard`
  },
  {
    to: '/admin/user',
    icon: mdiAccountGroupOutline,
    label: 'Users'
  },
  {
    label: 'Apointments',
    icon: mdiViewList,
    menu: [
      {
        label: 'Appointments',
        to: '/admin/appointments-list',
      },
      {
        label: 'Schedule',
        to: '/admin/appointments-schedule',
      },
      {
        label: 'History',
        to: '/admin/appointment-history',
      }
    ]
  },
  {
    to: '/admin/services',
    label: 'Services',
    icon: mdiShapeOutline 
  },
  {
    to: '/admin/roles',
    label: 'Roles',
    icon: mdiTable
  },
  {
    to: '/admin/reports',
    label: 'Reports',
    icon: mdiTable
  },

  // last
  // {
  //   to: '/admin/tables',
  //   label: 'Tables',
  //   icon: mdiTable
  // },
  // {
  //   to: '/admin/forms',
  //   label: 'Forms',
  //   icon: mdiSquareEditOutline
  // },
  // {
  //   to: '/admin/ui',
  //   label: 'UI',
  //   icon: mdiTelevisionGuide
  // },
  // {
  //   to: '/admin/responsive',
  //   label: 'Responsive',
  //   icon: mdiResponsive
  // },
  // {
  //   to: '/admin/profile',
  //   label: 'Profile',
  //   icon: mdiAccountCircle
  // },
  // {
  //   to: '/admin/login',
  //   label: 'Login',
  //   icon: mdiLock
  // },
  // {
  //   to: '/admin/error',
  //   label: 'Error',
  //   icon: mdiAlertCircle
  // },
  // {
  //   label: 'Dropdown',
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: 'Item One'
  //     },
  //     {
  //       label: 'Item Two'
  //     }
  //   ]
  // },
  // {
  //   href: 'https://github.com/justboil/admin-one-react-tailwind',
  //   label: 'React version',
  //   icon: mdiReact,
  //   target: '_blank'
  // }
]
