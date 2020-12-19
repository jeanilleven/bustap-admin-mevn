<template>
  <div id="app">
    <Navbar/>
    <!-- <SideNav/> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/partials/Navbar'
// import SideNav from '@/components/partials/SideNav'
export default {
  name: 'App',
  components: {
    Navbar,
    // SideNav
  }
}
</script>


