<template>
    <div>
        <ul id="slide-out" class="sidenav">
            <li><div class="user-view">
            <div class="background">
                <!-- <img src="assets/office.jpg"> -->
            </div>
            <h4 class="cyan-text">BusTap</h4>
            </div></li>
            <!-- <li>    
                <router-link to="/" class="withIcon">
                    <span class="icon"><ViewDashboard :size="19"/></span> 
                    <span class="padd">Dashboard</span> 
                </router-link>
            </li>
            <li>    
                <router-link to="/statistics" class="withIcon">
                    <span class="icon"><Poll :size="19"/></span> 
                    <span class="padd">Statistics</span> 
                </router-link>
            </li> -->
            <li>    
                <router-link to="/operators" class="withIcon">
                    <span class="icon"><AccountGroupOutline :size="19"/></span> 
                    <span class="padd">Operators</span> 
                </router-link>
            </li>
            <li>    
                <router-link to="/employees" class="withIcon">
                    <span class="icon"><AccountOutline :size="19"/></span> 
                    <span class="padd">Employees</span> 
                </router-link>
            </li>
            <li>    
                <router-link to="/vehicles" class="withIcon">
                    <span class="icon"><Bus :size="19"/></span> 
                    <span class="padd">Vehicles</span> 
                </router-link>
            </li>
            <li>    
                <router-link to="/terminals" class="withIcon">
                    <span class="icon"><MapMarker :size="19"/></span> 
                    <span class="padd">Terminals</span> 
                </router-link>
            </li>
            <!-- <li><div class="divider"></div></li>
            <li><a class="subheader">Subheader</a></li>
            <li><a class="waves-effect" href="#!">Third Link With Waves</a></li> -->
        </ul>
    </div>
    
</template>

<script>
export default {
 props: ['user'],
}

</script>


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
    h4{
        margin-bottom: 2em
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