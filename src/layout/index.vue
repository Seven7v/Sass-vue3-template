<template>
  <div>
    <Header />
    <div class="disflex h100">
      <div class="h100">
        <SidderBar />
      </div>
      <div class="h100 flex1 overx-hide">
        <Breadcrumb />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidderBar from './components/SidderBar.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Header from './components/Header.vue'
</script>

<style lang="scss" scoped></style>
