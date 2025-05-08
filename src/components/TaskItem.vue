<template>
  <tr>
    <td>
      <span :class="{ 'line-through text-gray-500': task.completed }">
        {{ task.title }}
      </span>
    </td>
    <td>{{ task.status }}</td>
    <td>
      <button @click="$emit('edit', task.uuid)" class="text-blue-500 mr-2">Edit</button>
      <button @click="$emit('delete', task.uuid)" class="text-red-500">Delete</button>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true,
  },
})
</script>
