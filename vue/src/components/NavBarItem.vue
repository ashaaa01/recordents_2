<script setup>
import { mdiChevronUp, mdiChevronDown, mdiAccount } from '@mdi/js'
import { RouterLink } from 'vue-router'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useMainStore } from '@/stores/main.js'
import { useStore } from "vuex";
import BaseIcon from '@/components/BaseIcon.vue'
import UserAvatarCurrentUser from '@/components/UserAvatarCurrentUser.vue'
import NavBarMenuList from '@/components/NavBarMenuList.vue'
import NavBarNotifList from '@/components/NavBarNotifList.vue'
import BaseDivider from '@/components/BaseDivider.vue'

const store = useStore();

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['menu-click'])

const is = computed(() => {
  if (props.item.href) {
    return 'a'
  }

  if (props.item.to) {
    return RouterLink
  }

  return 'div'
})

const componentClass = computed(() => {
  const base = [
    isDropdownActive.value
      ? `navbar-item-label-active dark:text-slate-400`
      : `navbar-item-label dark:text-white dark:hover:text-slate-400`,
    props.item.menu || props.item.notif ? 'lg:py-2 lg:px-3' : 'py-2 px-3'
  ]

  if (props.item.isDesktopNoLabel) {
    base.push('lg:w-16', 'lg:justify-center')
  }

  return base
})

const itemLabel = computed(() =>
  props.item.isCurrentUser ? store.state.user.data.full_name : props.item.label
)

const isDropdownActive = ref(false)

const menuClick = (event) => {
  emit('menu-click', event, props.item)

  if (props.item.menu) {
    isDropdownActive.value = !isDropdownActive.value
  }

  if (props.item.notif) {
    isDropdownActive.value = !isDropdownActive.value
  }

}

const menuClickDropdown = (event, item) => {
  emit('menu-click', event, item)
}

const root = ref(null)

const forceClose = (event) => {
  if (root.value && !root.value.contains(event.target)) {
    isDropdownActive.value = false
  }
}

onMounted(() => {
  if (props.item.menu) {
    window.addEventListener('click', forceClose)
  }
  if (props.item.notif) {
    window.addEventListener('click', forceClose)
  }
})

onBeforeUnmount(() => {
  if (props.item.menu) {
    window.removeEventListener('click', forceClose)
  }
  if (props.item.notif) {
    window.removeEventListener('click', forceClose)
  }
})

// Notification

const  notifications = ref([
  {  id: 1, label: " Notification" },
  {
    isDivider: true
  },
  { id: 2, label: "Notification" },
  {
    isDivider: true
  },
  { id: 3, label: "Notification" },
  {
    isDivider: true
  },
  { id: 3, label: "Notification" },
  {
    isDivider: true
  },
  { id: 3, label: "Notification" },
  {
    isDivider: true
  },
  { id: 3, label: "Notification" },
  {
    isDivider: true
  },
  { id: 3, label: "Notification" },
  // Add more notifications here
]);

</script>

<template>
  <BaseDivider v-if="item.isDivider" nav-bar />
  <component
    :is="is"
    v-else
    ref="root"
    class="block lg:flex items-center relative cursor-pointer "
    :class="componentClass"
    :to="item.to ?? null"
    :href="item.href ?? null"
    :target="item.target ?? null"
    @click="menuClick"
  >
    <div
      class="flex items-center"
      :class="{
        'bg-gray-100 dark:bg-slate-800 lg:bg-transparent lg:dark:bg-transparent p-3 lg:p-0':
          item.menu 
      }"
    >
      <UserAvatarCurrentUser v-if="item.isCurrentUser" class="w-6 h-6 mr-3 inline-flex" />
      <BaseIcon v-if="item.icon" :path="item.icon" class="transition-colors" />
      <span
        class="px-2 transition-colors"
        :class="{ 'lg:hidden': item.isDesktopNoLabel && item.icon }"
        >{{ itemLabel }}</span
      >
      <BaseIcon
        v-if="item.menu"
        :path="isDropdownActive ? mdiChevronUp : mdiChevronDown"
        class="hidden lg:inline-flex transition-colors"
      />
    </div>

    <!-- Badge -->
    <div v-if="item.isBadge && notifications.length" class="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center">
      <!-- Content inside the circular background -->
      <span class="font-bold text-sm text-white ">&nbsp;11&nbsp;</span>
    </div>

    <!-- Menu -->
    <div
      v-if="item.menu"
      class="text-sm border-b border-gray-100 lg:border lg:bg-white lg:absolute lg:top-full lg:left-0 lg:min-w-full lg:z-20 lg:rounded-lg lg:shadow-lg lg:dark:bg-slate-800 dark:border-slate-700"
      :class="{ 'lg:hidden': !isDropdownActive }"
    >
      <NavBarMenuList :menu="item.menu" @menu-click="menuClickDropdown" />
    </div>
    <!-- Notification -->
    <div
      v-if="item.notif"
      class="text-sm border-b border-gray-100 lg:border lg:bg-white lg:absolute lg:top-full lg:left-0 lg:min-w-full lg:z-20 lg:rounded-lg lg:shadow-lg lg:dark:bg-slate-800 dark:border-slate-700 max-h-40 overflow-y-auto"
      :class="{ 'hidden': !isDropdownActive }"
    >
      <NavBarNotifList :menu="notifications" @menu-click="menuClickDropdown" />
    </div>
  </component>
</template>
