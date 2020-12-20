import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Operators from '@/components/Operators'
import Vehicles from '@/components/Vehicles'
import Employees from '@/components/Employees'
import Terminals from '@/components/Terminals'
import Statistics from '@/components/Statistics'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path:'/',
            name: 'home',
            component: Home
        },
        {
            path:'/statistics',
            name: 'statistics',
            component: Statistics
        },
        {
            path:'/operators',
            name: 'operators',
            component: Operators
        },
        {
            path:'/employees',
            name: 'employees',
            component: Employees
        },
        {
            path:'/vehicles',
            name: 'vehicles',
            component: Vehicles
        },
        {
            path:'/terminals',
            name: 'terminals',
            component: Terminals
        }
    ]
})
