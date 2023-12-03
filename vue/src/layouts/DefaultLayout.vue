<script setup>

import { useStore } from "vuex";
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js'
import { ref, computed, watchEffect, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import menuAside from '@/menuAside.js'
import menuNavBar from '@/menuNavBar.js'
import menuAsideStaff from '@/menuAsideStaff.js'
import menuNavBarStaff from '@/menuNavBarStaff.js'
import menuAsidePatient from '@/menuAsidePatient.js'
import menuNavBarPatient from '@/menuNavBarPatient.js'
import { useDarkModeStore } from '@/stores/darkMode.js'
import BaseIcon from '@/components/BaseIcon.vue'
import FormControl from '@/components/FormControl.vue'
import NavBar from '@/components/NavBar.vue'
import NavBarItemPlain from '@/components/NavBarItemPlain.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'

import CustomToaster from '@/mycomponents/CustomToast.vue'


const layoutAsidePadding = 'xl:pl-60'

const darkModeStore = useDarkModeStore()

const store = useStore();
const router = useRouter()

const userRole = computed(()=> store.state.user.role);
const user = computed(()=> store.state.user.data);
const roles = computed(()=> store.state.roleList);
const user_role = computed(()=> roles.value.find(item => item.id === user.value.role_id));
const menu_data = ref([]);
const staffAside = ref([]);
const newAside = ref([]);

watch(menu_data,()=> { 
  
  for (const asideLinkItem of staffAside.value) {
    const foundPermission = menu_data.value.find(permissionItem => permissionItem.id === asideLinkItem.id);
    if (foundPermission) {
      newAside.value.push(asideLinkItem);
    }
  }
})


watchEffect(()=> {
  const menu = user_role.value;
  if (menu && (userRole.value == 'staff')) {
    menu_data.value = [...menu.menu_data];
  } else {
    menu_data.value = []; // Set menu_data to empty if user_role is not found or null
  }
})

// console.log(roles.value.menu_data);

staffAside.value = menuAsideStaff;

// const permission = [...user_role.value.menu_data];
const permission =
ref([
  { id: 1, menu: [] },
  { id: 200, menu: [ { id: 300 }, { id: 400 }, { id: 500 } ] },
  { id: 600, menu: [] },
  { id: 700, menu: [] }
]);

 // watchEffect(()=> {
 //    

 // })




// Loop through asideLink
// staffAside.value.forEach(link => {
//   // Find matching permission based on id
//   const matchingPermission = permission.find(perm => perm.id === link.id);

//   // If there's no matching permission or no menu, add the link
//   if (!matchingPermission || !matchingPermission.menu || matchingPermission.menu.length === 0) {
//     // Clone the link object and add it to newAside
//     const clonedLink = { ...link };
//     newAside.value.push(clonedLink);
//   } else if (matchingPermission.menu.length > 0) {
//     // If there's a matching permission with a menu, add the whole link
//     const clonedLink = { ...link };
//     newAside.value.push(clonedLink);
//   }
// });

// Result will be in the newAside array
// console.log(newAside);

// const staffSide = ref([]);

// items.value.forEach(item => {
//   item.permission_data = item.permission.map(permissionId => {
//     return permissions.value.find(permission => permission.id === permissionId);
//   });
// });

 // staffSide.value = user_role.permission.map(permissionId => {
 //    return menuAsideStaff.value.find(permission => permission.id === permissionId);
 //  });


const isAsideMobileExpanded = ref(false)
const isAsideLgActive = ref(false)

router.beforeEach(() => {
  isAsideMobileExpanded.value = false
  isAsideLgActive.value = false
})

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    darkModeStore.set()
  }

  if (item.isLogout) {
    store.dispatch("logout").then(() => {
      router.push({
        name: "login",
      });
    });
  }

  if (item.isNotification) {
    let message = ["Sorry, feature is not currently available."];
    store.commit("notify", {
      show: true,
      type: "info",
      title: 'Not available',
      message: [message],
    });

  }
}


if(store.state.refresh) {
  store.dispatch("getRoleList");
  store.dispatch('getUser');
  store.dispatch("getUserList");
  store.dispatch("getServiceList");
  store.dispatch("getBookList");
  store.dispatch("getTimeList");
  
  store.commit("stopRefresh")
}

const menuNavItems = ref([]);
const menuAsideItems = ref([]);

watchEffect(() => {
  if(store.state.user.data.role == "Admin"){
    menuNavItems.value = menuNavBar;
    menuAsideItems.value = menuAside;  
  } else if(store.state.user.data.role == "Staff"){
    menuNavItems.value = menuNavBarStaff;
    menuAsideItems.value = newAside.value;

  } else if(store.state.user.data.role == "Patient"){
    menuNavItems.value = menuNavBarPatient;
    menuAsideItems.value = menuAsidePatient;
  }
});




</script>

<template>
  <div
    :class="{
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavItems" 
        :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain display="hidden lg:flex xl:hidden" @click.prevent="isAsideLgActive = true">
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain use-margin>
          <!-- <FormControl placeholder="Search (ctrl+k)" ctrl-k-focus transparent borderless /> -->
        </NavBarItemPlain>
      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAsideItems"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <router-view :role="userRole"></router-view>
      <CustomToaster />
      <FooterBar>
        Management System
      </FooterBar>
    </div>
  </div>
</template>
