<template>
  <div class="p-4">
    <h2 class="text-xl mb-4">Edit Task</h2>
    <TaskFormEdit
      :task="task"
      @save="updateTask"
      @cancel="editingTask"
      :field-errors="fieldErrors"
    />
    <p class="text-red-500 text-sm" v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api";
import TaskFormEdit from "../components/TaskFormEdit.vue";
import { inject } from "vue";

const route = useRoute();
const router = useRouter();
const task = ref(null);
const fieldErrors = ref({});
const error = ref("");
const toastr = inject("toastr");

onMounted(async () => {
  const id = route.params.id;
  const token = localStorage.getItem("token");
  const response = await api.get(`/tasks/edit/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  task.value = response.data.task;
});

const updateTask = async (updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post(
      `/tasks/update/${task.value.uuid}`,
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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

const editingTask = () => {
  router.push("/tasks");
};
</script>
