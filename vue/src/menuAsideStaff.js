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
    id: 100,
    to: '/staff/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    id: 200,
    label: 'Appointments',
    icon: mdiViewList,
    menu: [
      // {
      //   id: 300,
      //   label: 'Appointments',
      //   to: '/staff/appointments-list',
      // },
      // {
      //   id: 400,
      //   label: 'Schedule',
      //   to: '/staff/appointments-schedule',
      // },
      {
        id: 500,
        label: 'History',
        to: '/staff/appointments-history',
      },
    ]
  },
  {
    id: 600,
    to: '/staff/services',
    label: 'Services',
    icon: mdiShapeOutline 
  },
  {
    id: 700,
    to: '/staff/roles',
    label: 'Roles',
    icon: mdiTable
  },
  {
    id: 800,
    to: '/staff/reports',
    label: 'Reports',
    icon: mdiTable
  },
]
