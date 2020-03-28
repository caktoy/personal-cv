<template>
  <div class="container mx-auto flex content-center items-start">
    <div class="w-1/3 bg-gray-500 px-4 py-2 m-2">
      <left-panel />
    </div>
    <div class="w-2/3 bg-gray-500 px-4 py-2 m-2">
      <content-panel />
    </div>
  </div>
</template>

<script>
import LeftPanel from '~/components/LeftPanel'
import ContentPanel from '~/components/ContentPanel'

export default {
  components: { LeftPanel, ContentPanel }
}
</script>

<style>
</style>
