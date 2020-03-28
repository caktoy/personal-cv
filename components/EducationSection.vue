<template>
  <div>
    <h1
      class="text-lg mb-2 px-2 font-semibold text-lg border-b-2 flex flex-row justify-between border-black cursor-pointer"
      @click="toggle"
    >
      <div>
        _$ Educations
      </div>
      <div>
        <span v-if="active"> - </span>
        <span v-else> + </span>
      </div>
    </h1>
    <ul v-if="active" class="list-disc px-6 transition-all duration-500">
      <li v-for="item in items" :key="item.company" class="my-3">
        <div class="font-semibold">
          {{ item.field }} @
          <a :href="item.website" target="__blank" class="hover:text-red-700 hover:underline transition duration-200">{{ item.institution }}</a>
        </div>
        <div class="font-semibold text-sm">
          {{ item.period.start }} - {{ item.period.end }}
        </div>
        <p class="text-justify text-sm">
          {{ item.description }}
        </p>
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
