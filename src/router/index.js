import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import TaskCreate from "@/components/TaskCreate.vue";
import TaskEdit from "@/components/TaskEdit.vue";
import TaskView from "@/views/TaskView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/tasks", component: TaskView },
  { path: "/tasks/create", component: TaskCreate },
  { path: "/tasks/edit/:id", component: TaskEdit, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
