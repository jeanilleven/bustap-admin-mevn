<template>
    <div id = "navbar">
        <nav class="white z-depth-0">
            <div class="nav-wrapper container ">
            
            <span>
                <!-- <a href="#" data-target="slide-out" class="sidenav-trigger black-text">click</a> -->
                <a href="#" data-target="slide-out" class="sidenav-trigger black-text show-on-large transparent"><Menu :size="30" class="icon"/></a>
                <router-link to="/" class="brand-logo cyan-text text-accent-4">BusTap</router-link>
            </span>
        
            <!-- <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a href="sass.html" class="black-text">Sass</a></li>
                <li><a href="badges.html"  class="black-text">Components</a></li>
                <li><a href="collapsible.html"  class="black-text">JavaScript</a></li>
            </ul> -->
            </div>
        </nav>
        <SideNav/>
    </div>
    
</template>

<style lang="scss">
.navbar {

}
</style>

<script>
import SideNav from '@/components/partials/SideNav'
import Menu from 'vue-material-design-icons/Menu.vue';
export default {
  name: 'navbar',
  components: {
    // Navbar,
    SideNav,
    Menu
  }
}
</script>
