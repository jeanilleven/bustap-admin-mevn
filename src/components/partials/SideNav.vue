<template>
    <div>
        <ul id="slide-out" class="sidenav">
            <li><div class="user-view">
            <div class="background">
                <img src="assets/office.jpg">
            </div>
            <a href="#name"><span class="white-text name">John Doe</span></a>
            <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
            </div></li>
            <li><a href="/" class="withIcon"><ViewDashboard style="display: inline"/> <span class="padd">Dashboard</span> </a></li>
            <li><a href="#!">Second Link</a></li>
            <li><div class="divider"></div></li>
            <li><a class="subheader">Subheader</a></li>
            <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>
    </div>
    
</template>

<script>
import ViewDashboard from 'vue-material-design-icons/ViewDashboardOutline.vue';
 
// Vue.component('menu-icon', MenuIcon);

export default {
  name: 'sidenav',
  components: {
      ViewDashboard
  }
}
</script>

<style lang="scss">
.sidenav {
    .padd{
        padding-left: 15px;
        padding-bottom: 0;
        margin: auto;
        font-size: 24;
    }
}
</style>