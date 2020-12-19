<template>
    <div>
        <nav class="white z-depth-0">
            <div class="nav-wrapper container ">
            
            <span>
                <!-- <a href="#" data-target="slide-out" class="sidenav-trigger black-text">click</a> -->
                <a href="#" data-target="slide-out" class="sidenav-trigger black-text btn show-on-large"><i class="material-icons">menu</i></a>
                <router-link to="/" class="brand-logo cyan-text text-accent-4">BusTap</router-link>
            </span>
        
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a href="sass.html" class="black-text">Sass</a></li>
                <li><a href="badges.html"  class="black-text">Components</a></li>
                <li><a href="collapsible.html"  class="black-text">JavaScript</a></li>
            </ul>
            </div>
        </nav>
        <SideNav/>
        <!-- <ul id="slide-out" class="sidenav">
            <li>
                <div class="user-view">
                    <div class="background">
                        <img src="images/office.jpg">
                    </div>
                    <a href="#name"><span class="white-text name">John Doe</span></a>
                    <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
                </div>
            </li>
            <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
            <li><a href="#!">Second Link</a></li>
            <li><div class="divider"></div></li>
            <li><a class="subheader">Subheader</a></li>
            <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul> -->

    <!-- <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a> -->
    </div>
    
</template>

<script>
import SideNav from '@/components/partials/SideNav'
export default {
  name: 'App',
  components: {
    // Navbar,
    SideNav
  }
}
</script>
