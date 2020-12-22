<template>
  <div id="app">
    <Navbar/>
    <!-- <SideNav/> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/partials/Navbar'
import M from 'materialize-css'
// import SideNav from '@/components/partials/SideNav'
export default {
  name: 'App',
  components: {
    Navbar,
    // SideNav
  },
  mounted(){
    M.AutoInit()
  }
}
</script>

<style lang="scss">

</style>


