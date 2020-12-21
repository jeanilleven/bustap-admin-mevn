<template>
    <div class="container" id="vehiclesTable">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>bus_code</th>
                    <th>plate_number</th>
                    <th>type</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="vehicle in vehicles" v-bind:key="vehicle.uid">
                    <td>{{vehicle.uid}}</td>
                    <th>{{vehicle.bus_code}}</th>
                    <td>{{vehicle.plate_number}}</td>
                    <td>{{vehicle.type}}</td>
                    <td>view-icon</td>
                    <td>bin-icon</td>
                </tr> 
            </tbody>
      </table>
    </div>
</template>
<style lang="scss">
#vehiclesTable {
    button{
        background: transparent;
        border: none;
    }
    button:on-click {
        background: grey;
    }
    button:on-focus{
        background: grey;
    }
}
</style>
<script>

import TrashCanOutline from 'vue-material-design-icons/TrashCanOutline.vue';
import EyeOutline from 'vue-material-design-icons/EyeOutline.vue';

import db from './firebase/firebaseInit'
export default {
    name: 'vehiclesTable',
    components: {
        EyeOutline,
        TrashCanOutline,
        "modal": require("vue-materialize/modal")
    },
    bus_code: 'vehicles',
    data(){
        return{
            vehicles: []
        }
    },
    created(){
        db.collection('buses').get().then(querSnapshot => {
            querSnapshot.forEach(doc => {
                const data = {
                    'uid': doc.id,
                    'bus_code': doc.data().bus_code,
                    'type': doc.data().type,
                    'plate_number': doc.data().plate_number
                }
                this.vehicles.push(data)
            })
        })
    },
    
}
</script>