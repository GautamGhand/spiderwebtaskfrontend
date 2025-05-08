<template>
  <form
    @submit.prevent="handleSubmit"
    class="max-w-md mx-auto p-4 bg-white rounded shadow"
  >
    <div class="mb-4">
      <label class="block text-gray-700 mb-1">Title</label>
      <input
        type="text"
        v-model="form.title"
        class="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
        placeholder="Enter task title"
      />
      <p v-if="fieldErrors.title" class="text-red-500 text-sm">
        {{ fieldErrors.title[0] }}
      </p>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 mb-1">Description</label>
      <input
        type="text"
        v-model="form.description"
        class="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
        placeholder="Enter task description"
      />
      <p v-if="fieldErrors.description" class="text-red-500 text-sm">
        {{ fieldErrors.description[0] }}
      </p>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 mb-1">Status</label>
      <select
        v-model="form.status"
        class="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
      >
        <option value="">Select status</option>
        <option value="Pending" :selected="form.status === 'Pending'">
          Pending
        </option>
        <option value="In-Progress" :selected="form.status === 'In-Progress'">
          In-Progress
        </option>
        <option value="Completed" :selected="form.status === 'Completed'">
          Completed
        </option>
      </select>
      <p v-if="fieldErrors.status" class="text-red-500 text-sm">
        {{ fieldErrors.status[0] }}
      </p>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 mb-1">Due Date</label>
      <input
        type="date"
        v-model="form.due_date"
        class="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
        placeholder="Enter Due Date"
      />
      <p v-if="fieldErrors.due_date" class="text-red-500 text-sm">
        {{ fieldErrors.due_date[0] }}
      </p>
    </div>

    <div class="flex justify-end space-x-2">
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {{ isEditing ? "Update" : "Create" }} Task
      </button>
      <button
        v-if="isEditing"
        type="button"
        @click="handleCancel"
        class="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch, computed } from "vue";

const props = defineProps({
  task: {
    type: Object,
    default: null,
  },
  fieldErrors: Object,
});

const emit = defineEmits(["save", "cancel"]);

const form = reactive({
  title: "",
  status: "",
  description: "",
  due_date: "",
});

watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      form.title = newTask.title || "";
      form.status = newTask.status || "";
      form.description = newTask.description || "";
      form.due_date = newTask.due_date || "";
    } else {
      form.title = "";
      form.status = "";
      form.description = "";
      form.due_date = "";
    }
  },
  { immediate: true }
);

const isEditing = computed(() => !!props.task);

function handleSubmit() {
  emit("save", { ...form });
}

function handleCancel() {
  emit("cancel");
}
</script>
