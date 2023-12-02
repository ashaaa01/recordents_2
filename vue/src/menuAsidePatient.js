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
  mdiAccountGroupOutline 
} from '@mdi/js'

export default [
  {
    to: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    label: 'Apointments',
    icon: mdiViewList,
    menu: [
      {
        label: 'Book',
        to: '/book-list',
      },
      {
        label: 'Schedules',
        to: '/schedules',
      },
      {
        label: 'History',
        to: '/history',
      }
    ],
  },
]
