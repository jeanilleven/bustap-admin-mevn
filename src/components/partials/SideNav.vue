<template>
    <div>
        <ul id="slide-out" class="sidenav">
            <li><div class="user-view">
            <div class="background">
                <!-- <img src="assets/office.jpg"> -->
            </div>
            <a href="#name"><span class="name">John Doe</span></a>
            <a href="#email"><span class="email">jdandturk@gmail.com</span></a>
            </div></li>
            <li>    
                <a href="/" class="withIcon">
                    <span class="icon"><ViewDashboard :size="19"/></span> 
                    <span class="padd">Dashboard</span> 
                </a>
            </li>
            <li>    
                <a href="/" class="withIcon">
                    <span class="icon"><Poll :size="19"/></span> 
                    <span class="padd">Statistics</span> 
                </a>
            </li>
            <li>    
                <a href="/" class="withIcon">
                    <span class="icon"><AccountGroupOutline :size="19"/></span> 
                    <span class="padd">Operators</span> 
                </a>
            </li>
            <li>    
                <a href="/" class="withIcon">
                    <span class="icon"><AccountOutline :size="19"/></span> 
                    <span class="padd">Employees</span> 
                </a>
            </li>
            <li>    
                <a href="/" class="withIcon">
                    <span class="icon"><Bus :size="19"/></span> 
                    <span class="padd">Vehicles</span> 
                </a>
            </li>
            <li>    
                <a href="/" class="withIcon">
                    <span class="icon"><MapMarker :size="19"/></span> 
                    <span class="padd">Terminals</span> 
                </a>
            </li>
            <!-- <li><div class="divider"></div></li>
            <li><a class="subheader">Subheader</a></li>
            <li><a class="waves-effect" href="#!">Third Link With Waves</a></li> -->
        </ul>
    </div>
    
</template>


<style lang="scss">
.sidenav {
    .withIcon{
        height: auto;
    }
    .icon{
        margin: 10px;
    }
    .padd{
        padding-left: 15px;
        font-size: 24;
    }
}
</style>

<script>
import ViewDashboard from 'vue-material-design-icons/ViewDashboardOutline.vue';
import Poll from 'vue-material-design-icons/Poll.vue';
import AccountGroupOutline from 'vue-material-design-icons/AccountGroupOutline.vue';
import AccountOutline from 'vue-material-design-icons/AccountOutline.vue';
import Bus from 'vue-material-design-icons/Bus.vue';
import MapMarker from 'vue-material-design-icons/MapMarker.vue';
 
// Vue.component('menu-icon', MenuIcon);

export default {
  name: 'sidenav',
  components: {
      ViewDashboard, 
      Poll,
      AccountGroupOutline,
      AccountOutline,
      Bus,
      MapMarker
  }
}
</script>