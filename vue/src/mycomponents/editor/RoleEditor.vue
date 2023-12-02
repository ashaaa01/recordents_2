<template>
  <!-- Question index -->
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold">
      {{ index + 1 }}. {{ model.role_type }}
    </h3>
    <div v-if="addForm" class="flex items-center">
      <!-- Add new question -->
      <button
        type="button"
        @click="addService()"
        class="
          flex
          items-center
          text-xs
          py-1
          px-3
          mr-2
          rounded-sm
          text-white
          bg-gray-600
          hover:bg-gray-700
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Add
      </button>
      <!--/ Add new question -->

      <!-- Delete question -->
      <button
        type="button"
        @click="deleteService()"
        class="
          flex
          items-center
          text-xs
          py-1
          px-3
          rounded-sm
          border border-transparent
          text-red-500
          hover:border-red-600
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        Delete
      </button>
      <!--/ Delete question -->
    </div>
  </div>
  <!--/ Question index -->

  <div :class="[ selectOptions ? 'grid gap-3 grid-cols-12' : '' ] ">
    <!-- Question -->
    <div class="mt-3 col-span-9 mb-8">
      <label
        :for="'question_text_' + model.id"
        class="block text-sm font-medium text-gray-700"
        >Role</label
      >
      <input
        type="text"
        :name="'question_text_' + model.id"
        v-model="model.role_type"
        @change="dataChange"
        :id="'question_text_' + model.id"
        class="
          px-3 
          py-2.5 
          mt-1
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          shadow-sm
          sm:text-sm
          border-gray-300
          rounded-md
        "
      />
      <!-- <div class="text-xs text-gray-500 dark:text-slate-400 mt-1">
        
      </div> -->
    </div>
    <!--/ Question -->
     <div class="mt-3 col-span-3 mb-8">
      <label for="brand_id" class="block text-sm font-medium text-gray-700">Permission</label>
      <div>
        <button
          type="button"
          @click="toggleDropdown"
          class="flex justify-between w-full px-3 py-2 mt-1 text-left border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <span v-if="selectedBrands.length === 0">-- Select Permission --</span>
          <span v-else-if="selectedBrands.length === brands.length">All Permissions Selected</span>
          <span v-else>{{ selectedBrands.length }} permission{{ selectedBrands.length > 1 ? 's' : '' }} selected</span>
          <svg
            v-if="isOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 ml-2 -mr-1 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 12a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M3 7a2 2 0 114 0 2 2 0 01-4 0zM13 7a2 2 0 114 0 2 2 0 01-4 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div v-show="isOpen" class="absolute z-10 mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
        <!-- <div class="p-3">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="selectAll" @change="toggleAll">
            <span class="ml-2">Select All</span>
          </label>
        </div> -->
        <div v-for="data in brands" :key="data.id" class="p-3 border-t border-gray-300">
          <label class="inline-flex items-center">
            <input type="checkbox" :value="data.id" v-model="selectedBrands" @change="checkOption" >
            <span class="ml-2">{{ upperCaseFirst(data.permission) }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
  <div>
  </div>
  <!--/ Data -->
  <hr class="my-4" />
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { watchEffect, watch } from "vue"

const store = useStore();

const props = defineProps({
  service: Object,
  index: Number,
  selectOptions: Boolean,
  addForm: Boolean,
  hasOption: Boolean
});

// Get question types from vuex
const serviceTypes = computed(() => store.state.serviceTypes);

const model = ref(JSON.parse(JSON.stringify(props.service)));

const emit = defineEmits(["update:modelValue", "change", "addService", "deleteService"]);

// vue-multiselect
const isOpen = ref(false);
const selectAll = ref(false);
const brands = computed(() => store.state.permissionList);

const selectedBrands = ref([]);
const selectedPermissionData = ref([]);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function toggleAll() {
  if (selectAll.value) {
    selectedBrands.value = brands.value.filter(brand => brand.id !== 0).map(brand => brand.id );
    model.value.permission = [...selectedBrands.value];
  } else {
    selectedBrands.value = [];
    model.value.permission = [];
  }
  dataChange();
}

function checkOption() {

  // Update the model with selected permission IDs
  updateModel(selectedBrands);

  const zeroIdSelected = selectedBrands.value.includes(0);

  if (zeroIdSelected) {
    // If ID 0 is selected, unselect all other IDs
    selectedBrands.value = selectedBrands.value.filter(id => id === 0);
  } 

  const countSelected = selectedBrands.value.length;
  const countBrand = brands.value.length;

  if (countSelected === countBrand - 1) {
    const allExceptZeroSelected = selectedBrands.value.every(id => id !== 0);
    
    if (allExceptZeroSelected) {
      selectedBrands.value = [0];
    }
  }


  model.value.permission = [...selectedBrands.value];
  model.value.permission_data = [...selectedPermissionData.value];
  dataChange();

}

// Array to keep track of added data IDs
// let addedDataIds = [];
const removedDataIds = []; // To track removed data IDs

// Function to update the model based on selected permissions
function updateModel(selectedPermissionIds) {
  // Keep track of removed data IDs
  //const removedDataIds = [];

  // Iterate through selectedPermissionData.value to filter out deselected permissions
  // selectedPermissionData.value = selectedPermissionData.value.filter((data) => {
  //   if (selectedPermissionIds.value.includes(data.id)) {
  //     return true; // Keep existing data associated with selected permissions
  //   } else {
  //     //removedDataIds.push(data.id); // Track removed data IDs
  //     return false; // Filter out data associated with deselected permissions
  //   }
  // });

  selectedPermissionData.value = selectedPermissionData.value.filter((data) => {
    return selectedPermissionIds.value.includes(data.id);
  }); 

  selectedPermissionIds.value.forEach((selectedId) => {
    const permission = brands.value.find((perm) => perm.id === selectedId);

    // Update permission_data object
    const dataId = permission.data[0].id;
    const existingData = selectedPermissionData.value.find((data) => data.id === dataId);

    if (existingData) {
      // If the data ID already exists, add new unique menu items to it
      // const menuItems = permission.data[0].menu.filter((menuItem) => {
      //   return !existingData.menu.includes(menuItem);
      // });
      // existingData.menu.push(...menuItems);
      permission.data[0].menu.forEach((menuItem) => {
        if (!existingData.menu.some((item) => item.id === menuItem)) {
          existingData.menu.push({ id: menuItem });
        }
      });
    } else {
      // If the data ID doesn't exist, add it along with its unique menu items
      // const uniqueMenuItems = permission.data[0].menu.filter((menuItem) => {
      //   return !selectedPermissionData.value.some(
      //     (data) => data.menu.includes(menuItem)
      //   );
      // });
      // selectedPermissionData.value.push({ id: dataId, menu: uniqueMenuItems });

      const uniqueMenuItems = permission.data[0].menu.filter((menuItem) => {
        return !selectedPermissionData.value.some((data) => data.id === menuItem);
      }).map((menuItem) => ({ id: menuItem }));

      selectedPermissionData.value.push({ id: dataId, menu: uniqueMenuItems });
      // addedDataIds.push(dataId);
    }
  });

   // Deselect menu items for deselected permissions
  // selectedPermissionData.value = selectedPermissionData.value.filter((data) => {
  //   return selectedPermissionIds.value.includes(data.id);
  // });

   // Remove menu items associated with deselected permissions
  // removedDataIds.forEach((removedId) => {
  //   const index = selectedPermissionData.value.findIndex((data) => data.id === removedId);
  //   if (index !== -1) {
  //     selectedPermissionData.value.splice(index, 1);
  //   }
  // });

  // Remove deselected permissions and their associated data
  // model.value.permission = selectedPermissionIds;
  // model.value.permission_data = brands.value
  //   .filter((perm) => selectedPermissionIds.value.includes(perm.id))
  //   .map((perm) => {
  //     return {
  //       id: perm.data[0].id,
  //       menu: perm.data[0].menu.filter((menuItem) => {
  //         // Filter unique menu items
  //         if (!removedDataIds.includes(menuItem)) {
  //           removedDataIds.push(menuItem);
  //           return true;
  //         }
  //         return false;
  //       }),
  //     };
  //   });
}


selectedBrands.value = [...model.value.permission];

if(selectedBrands.value.length == brands.value.length){
  selectAll.value = true;
} else {
  selectAll.value = false;
}


function upperCaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


function typeChange() {

  dataChange();
}

// Emit the data change
function dataChange() {
  const data = model.value;

  emit("change", data);
}

function addService() {
  emit("addService", props.index + 1);
}

function deleteService() {
  emit("deleteService", props.service);
}

</script>

<style></style>
