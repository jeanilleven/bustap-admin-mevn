import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
import Signin from '@/components/Signinpage'
import Operators from '@/components/Operators'
import Vehicles from '@/components/Vehicles'
import Employees from '@/components/Employees'
import Terminals from '@/components/Terminals'
// import Statistics from '@/components/Statistics'
import firebase from 'firebase'


Vue.use(Router)

// export default new Router({
let router = new Router({
    mode: 'history',
    routes: [
        {
            path:'/',
            redirect: '/operators',
            meta: {
                requiresAuth: true
            }
        },
        {
            path:'/login',
            name: 'login',
            component: Signin,
            meta: {
                requiresGuest: true
            }
        },
        {
            path:'/operators',
            name: 'operators',
            component: Operators,
            meta: {
                requiresAuth: true
            }
        },
        {
            path:'/employees',
            name: 'employees',
            component: Employees,
            meta: {
                requiresAuth: true
            }
        },
        {
            path:'/vehicles',
            name: 'vehicles',
            component: Vehicles,
            meta: {
                requiresAuth: true
            }
        },
        {
            path:'/terminals',
            name: 'terminals',
            component: Terminals,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

// nav guards
router.beforeEach((to, from, next) => {
    // check for requiredAuth guard
    if(to.matched.some(record => record.meta.requiresAuth)){
        // check if NOT logged in
        if(!firebase.auth().currentUser){
            // go to login
            next({
                path: '/login',
                query:{
                    redirect: to.fullPath
                }
            })
        }else{
            // proceed to route
            next();
        }
    }else if(to.matched.some(record => record.meta.requiresGuest)){
        // check if logged in
        if(firebase.auth().currentUser){
            // go to login
            next({
                path: '/operators',
                query:{
                    redirect: to.fullPath
                }
            })
        }else{
            // proceed to route
            next();
        }
    }else{
        // proceed to route
        next();
    }
})

export default router;

