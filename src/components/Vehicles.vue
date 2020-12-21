<template>
    <div class="container" id="vehiclesTable">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Bus Codee</th>
                    <th>Capacity</th>
                    <th>Plate Number</th>
                    <th>Vehicle Type</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="vehicle in vehicles" v-bind:key="vehicle.uid">
                    <td>{{vehicle.uid}}</td>
                    <th>{{vehicle.bus_code}}</th>
                    <td>{{vehicle.capacity}}</td>
                    <td>{{vehicle.plate_number}}</td>
                    <td>{{vehicle.type}}</td>
                    <td>
                        <a v-bind:href="'#vehicle-'+ vehicle.uid" class="icon modal-trigger">
                            <span class="icon"><Eye :size="19"/></span> 
                        </a>
                        <a v-bind:href="'#schedules-'+ vehicle.uid" class="icon modal-trigger">
                            <span class="icon"><Calendar :size="19"/></span> 
                        </a>
                        <a href="#" class="icon">
                            <span class="icon"><DeleteOutline :size="19"/></span> 
                        </a>
                    </td>
                </tr> 
            </tbody>
        </table>
        <ViewVehicleModal v-for="vehicle in vehicles" :key="'vehicle'+vehicle.uid" :id="'vehicle-'+ vehicle.uid" :vehicle="vehicle" :type="'Bus'"/>
        <ViewVehicleSchedulesModal v-for="vehicle in vehicles" :key="'schedules'+vehicle.uid" :id="'schedules-'+ vehicle.uid" :vehicle="vehicle" :type="'Bus'"/>
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

import DeleteOutline from 'vue-material-design-icons/DeleteOutline.vue';
import Eye from 'vue-material-design-icons/Eye.vue';
import Calendar from 'vue-material-design-icons/Calendar.vue';
import ViewVehicleModal from '@/components/partials/ViewVehicleModal.vue';
import ViewVehicleSchedulesModal from '@/components/partials/ViewVehicleSchedulesModal.vue';
import M from 'materialize-css';

import db from './firebase/firebaseInit'
export default {
    name: 'vehiclesTable',
    components: {
        Eye,
        DeleteOutline,
        ViewVehicleModal,
        ViewVehicleSchedulesModal,
        Calendar
        // "modal": require("vue-materialize/modal")
    },
    bus_code: 'vehicles',
    data(){
        return {
            vehicles: []
        };
    },
    created(){
        db.collection('buses').get().then(querSnapshot => {
            querSnapshot.forEach(doc => {
                const data = {
                    'uid': doc.id,
                    'bus_code': doc.data().bus_code,
                    'capacity': doc.data().capacity,
                    'manufacturer': doc.data().manufacturer,
                    'plate_number': doc.data().plate_number,
                    'type': doc.data().type,
                    'docRef': doc.ref
                }
                if(doc.data().deleted == false){
                    this.vehicles.push(data);
                }
            })
        })
    },
    updated(){
        // waits the modals to be rendered before initializing the component
        this.$nextTick(() => M.AutoInit())
    }
    
}
</script>