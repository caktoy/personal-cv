<template>
  <div>
    <h1
      class="text-lg mb-2 px-2 font-semibold text-lg border-b-2 flex flex-row justify-between border-black cursor-pointer"
      @click="toggle"
    >
      <div>
        _$ Portofolios
      </div>
      <div>
        <span v-if="active"> - </span>
        <span v-else> + </span>
      </div>
    </h1>
    <div v-if="active">
      <div v-if="items.length > 0">
        <ul class="list-disc px-6 transition-all duration-500">
          <li v-for="item in items" :key="item.title" class="my-3">
            <div class="font-semibold">
              <a :href="item.website" target="__blank" class="hover:text-red-700 hover:underline transition duration-200">{{ item.title }}</a>
            </div>
            <div class="font-semibold text-sm">
              {{ item.date }}
            </div>
            <p class="text-justify text-sm">
              {{ item.description }}
            </p>
          </li>
        </ul>
      </div>
      <div v-else class="text-center italic text-xs">
        Sorry, this section is under construction, it will be ready as soon as posible.
      </div>
    </div>
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
      active: false
    }
  },
  methods: {
    toggle (e) {
      this.active = !this.active
    }
  }
}
</script>
