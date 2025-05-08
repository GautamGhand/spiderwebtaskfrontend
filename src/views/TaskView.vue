<template>
  <div>
    <h2>Tasks</h2>
    <button @click="logout">Logout</button>
    <button @click="createTask">Create Task</button>
    <div v-if="tasks.length === 0">No tasks yet.</div>
    <table class="w-full border">
      <thead>
        <tr>
          <th class="text-left p-2 border-b">Title</th>
          <th class="text-left p-2 border-b">Status</th>
          <th class="text-left p-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @edit="editTask"
          @delete="deleteTask"
        />
      </tbody>
    </table>

    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../api";
import TaskItem from "@/components/TaskItem.vue";
import { inject } from 'vue'

const router = useRouter();
const tasks = ref([]);
const error = ref("");
const editingTask = ref(null);
const toastr = inject('toastr')

const fetchTasks = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    tasks.value = response.data.tasks; // adjust based on your API response
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to fetch tasks";
    if (err.response?.status === 401) {
      router.push("/login");
    }
  }
};

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

const createTask = () => {
  router.push("tasks/create");
}

const editTask = (uuid) => {
  router.push(`/tasks/edit/${uuid}`)
};

const deleteTask = async (uuid) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post(
      `/tasks/delete/${uuid}`,
      {}, // No body data
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (response.data.success === true) {
      toastr.success(response.data.message);
      await fetchTasks();
    }
  } catch (err) {
    toastr.error(err.response?.data?.message || "Failed to delete task");
  }
};


onMounted(fetchTasks);
</script>
