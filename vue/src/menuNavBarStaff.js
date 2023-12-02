import {
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
  mdiGithub,
  mdiReact,
  mdiBellBadgeOutline 
} from '@mdi/js'

export default [
  // {
  //   icon: mdiBellBadgeOutline,
  //   label: 'Notification',
  //   isDesktopNoLabel: true,
  //   isBadge: true,
  //   notif: []
  // },
  // {
  //   icon: mdiThemeLightDark,
  //   label: 'Light/Dark',
  //   isDesktopNoLabel: true,
  //   isToggleLightDark: true
  // },
  // {
  //   isCurrentUser: true,
  //   menu: [
  //     {
  //       icon: mdiAccount,
  //       label: 'My Profile',
  //       to: '/staff/profile'
  //     },
  //     {
  //       isDivider: true
  //     },
  //     {
  //       icon: mdiLogout,
  //       label: 'Log Out',
  //       isLogout: true
  //     }
  //   ]
  // },
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'My Profile',
        to: '/staff/profile'
      },
      {
        isDivider: true
      },
      {
        icon: mdiThemeLightDark,
        label: 'Light/Dark',
        isToggleLightDark: true
      },
      {
        isDivider: true
      },
      {
        icon: mdiLogout,
        label: 'Log Out',
        isLogout: true
      }
    ]
  },

  // {
  //   icon: mdiBellBadgeOutline,
  //   label: 'Notification',
  //   isDesktopNoLabel: true,
  //   isSendNotif: true,
  // },

  // {
  //   icon: mdiLogout,
  //   label: 'Log out',
  //   isDesktopNoLabel: true,
  //   isLogout: true
  // }
]
