<template>
  <div class="p-4">
    <h2 class="text-xl mb-4">Create Task</h2>
    <TaskFormCreate @save="createTask" @cancel="cancelCreateTask"  :field-errors="fieldErrors" />
    <p class="text-red-500 text-sm" v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { inject } from "vue";
import TaskFormCreate from "../components/TaskFormCreate.vue";
import api from "../api";

const router = useRouter();
const toastr = inject("toastr");
const fieldErrors = ref({});
const error = ref('')

const createTask = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("tasks/store", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success == true) {
      toastr.success(response.data.message);
      router.push("/tasks");
    }
  } catch (err) {
    if (err.response?.status === 422) {
      fieldErrors.value = err.response.data.errors;
    } else {
      error.value = err.response?.data?.message || "Task Create Failed";
    }
  }
};

const cancelCreateTask = () => {
  router.push("/tasks");
};
</script>
