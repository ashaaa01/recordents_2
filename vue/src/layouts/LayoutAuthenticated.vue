<script setup>

import { useStore } from "vuex";
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js'
import { ref, computed, watchEffect } from 'vue'
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

const layoutAsidePadding = 'xl:pl-60'

const darkModeStore = useDarkModeStore()

const store = useStore();
const router = useRouter()


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
}

if(store.state.refresh) {
  store.dispatch('getUser');
  store.dispatch("getUserList");
  store.dispatch("getServiceList");
  store.dispatch("getBookList");
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
    menuAsideItems.value = menuAsideStaff;
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
          <FormControl placeholder="Search (ctrl+k)" ctrl-k-focus transparent borderless />
        </NavBarItemPlain>
      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAsideItems"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <slot />
      <FooterBar>
        Management System 
      </FooterBar>
    </div>
  </div>
</template>
