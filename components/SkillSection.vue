<template>
  <div>
    <h1
      class="text-lg mb-2 px-2 font-semibold text-lg border-b-2 flex flex-row justify-between border-black cursor-pointer"
      @click="toggle"
    >
      <div>
        _$ Skills
      </div>
      <div>
        <span v-if="active"> - </span>
        <span v-else> + </span>
      </div>
    </h1>
    <ul v-if="active" class="list-none px-6 transition-all duration-500">
      <li v-for="item in items" :key="item.name" class="my-3 flex flex-row justify-between">
        <div class="w-1/3">
          {{ item.name }}
        </div>
        <progress max="100" :value="item.percentage" class="w-2/3" />
      </li>
      <li class="text-xs italic">
        *] Note: the values above are my personal assessment which is very possible the standard of my assessment with you is different, I will be very open to discuss with you if it is needed.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      active: true
    }
  },
  methods: {
    toggle (e) {
      this.active = !this.active
    }
  }
}
</script>

<style>
progress[value],
progress[value]::-webkit-progress-bar {
  appearance: none;
  height: 1.2rem;
  background: transparent;
  border: 1px solid black;
}
progress[value]::-webkit-progress-value {
  appearance: none;
  background: black;
}
</style>
