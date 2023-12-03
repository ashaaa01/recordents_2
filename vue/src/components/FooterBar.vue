<script setup>
import { containerMaxW } from '@/config.js'
import BaseLevel from '@/components/BaseLevel.vue'
import JustboilLogo from '@/components/JustboilLogo.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="xl:px-2 xl:py-2 grid grid-cols-12  flex justify-center items-center" :class="containerMaxW">
    <!-- <BaseLevel > -->
      <div class="md:text-center col-span-11 ">
        <b>&copy;{{ year }}, <a>RecorDENTS</a>.</b>
        <slot />
      </div>
      <div class="md:py-2 col-span-1 flex justify-end ">
        <a>
          <img width="85" height="100" src="http://localhost:8000/images/logo-removebg-preview.png">
          <!-- <JustboilLogo class="w-auto h-8 md:h-6" /> -->
        </a>
      </div>
    <!-- </BaseLevel> -->
  </footer>
</template>
