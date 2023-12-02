<script setup>
import { computed } from 'vue'
import { mdiClose } from '@mdi/js'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  button: {
    type: String,
    default: 'info'
  },
  buttonLabel: {
    type: String,
    default: 'Done'
  },
  hasCancel: Boolean,
  hasSubmit: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  },
  classValue: {
    type: String,
    required: true
  },
  modalForm: {
    type: [String],
    default: null
  },

})

const emit = defineEmits(['update:modelValue', 'update:modalForm', 'cancel', 'confirm', 'submit'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const form = computed({
  get: () => props.modalForm,
  set: (value) => emit('update:modalForm', value)
})

const confirmCancel = (mode) => {
  value.value = false
  emit(mode)
}

const confirmSubmit = (mode) => {
  form.value = mode
  emit(mode)
}

const confirm = () => confirmCancel('confirm')

const cancel = () => confirmCancel('cancel')

const submit = () => confirmSubmit('submit');

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && value.value) {
    cancel()
  }
})
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox
      v-show="value"
      :class="classValue"
      is-modal
    >
      <CardBoxComponentTitle :title="title">
        <BaseButton
          v-if="hasCancel"
          :icon="mdiClose"
          color="whiteDark"
          small
          rounded-full
          @click.prevent="cancel"
        />
      </CardBoxComponentTitle>

      <div class="space-y-3">
        <slot />
      </div>

      <template #footer>
        <BaseButtons v-if="hasSubmit" class="justify-end">
          <BaseButton  label="Cancel" :color="button" @click="confirm"/>
          <BaseButton  label="Submit" :color="button" @click="submit" />
        </BaseButtons>
        <BaseButtons v-else>
          <BaseButton :label="buttonLabel" :color="button" @click="confirm" />
          <BaseButton v-if="hasCancel" label="Cancel" :color="button" outline @click="cancel" />
        </BaseButtons>
      </template>
    </CardBox>
  </OverlayLayer>
</template>
