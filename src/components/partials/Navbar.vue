<template>
    <div id = "navbar" v-if="isLoggedIn">
        <nav class="white z-depth-0">
            <div class="nav-wrapper container ">
            
                <span>
                    <!-- <a href="#" data-target="slide-out" class="sidenav-trigger black-text">click</a> -->
                    <a href="#" data-target="slide-out" class="sidenav-trigger black-text show-on-large transparent"><Menu :size="30" class="icon"/></a>
                    <router-link to="/" class="brand-logo cyan-text text-accent-4">BusTap</router-link>
                </span>
            
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li>    
                        <button class="btn-flat red-text" @click="logout()">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
        <SideNav :user="currentUser"/>
    </div>
    
</template>

<style lang="scss">
</style>

<script>
import firebase from 'firebase'
import SideNav from '@/components/partials/SideNav'
import Menu from 'vue-material-design-icons/Menu.vue';
export default {
    data(){
      return{
          isLoggedIn: false,
          currentUser: null,
      }
    },
    name: 'navbar',
    components: {
        // Navbar,
        SideNav,
        Menu
    },
    created(){
        if(firebase.auth().currentUser){
            this.isLoggedIn = true
            this.currentUser = firebase.auth().currentUser.email
            console.log(this.currentUser)
        }
    },
    methods:{
        logout: function(){
            this.isLoggedIn = false
            firebase.auth().signOut().then(() =>{
                this.$router.push('/login')
            })
        }
    }
}
</script>
