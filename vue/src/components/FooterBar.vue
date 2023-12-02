<script setup>
import { containerMaxW } from '@/config.js'
import BaseLevel from '@/components/BaseLevel.vue'
import JustboilLogo from '@/components/JustboilLogo.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="py-2 px-6 grid grid-cols-12  flex justify-center items-center" :class="containerMaxW">
    <!-- <BaseLevel > -->
      <div class="md:text-center col-span-10 ">
        <b>&copy;{{ year }}, <a>RecorDENTS</a>.</b>
        <slot />
      </div>
      <div class="md:py-2 col-span-2  text-right ">
        <a>
          Logo
          <!-- <JustboilLogo class="w-auto h-8 md:h-6" /> -->
        </a>
      </div>
    <!-- </BaseLevel> -->
  </footer>
</template>
