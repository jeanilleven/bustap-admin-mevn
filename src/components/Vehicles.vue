<template>
    <div class="container operator-container " style="margin-top:3em;" id="vehiclesTable">
        <h3>
            Vehicles 
            <a v-bind:href="'#'+'add-vehicle'" class="s1 right waves-effect waves-cyan btn cyan accent-4 modal-trigger">
                    Add Vehicle
            </a>
        </h3>
        
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
                        <a v-bind:href="'#delete-'+ vehicle.uid" class="icon modal-trigger">
                            <span class="icon"><DeleteOutline :size="19"/></span> 
                        </a>
                    </td>
                </tr> 
            </tbody>
        </table>
        <ViewVehicleModal v-for="vehicle in vehicles" :key="'vehicle-'+vehicle.uid" :id="'vehicle-'+ vehicle.uid" :vehicle="vehicle" :type="'Bus'"/>
        <AddVehicleModal key="add-vehicle" id="add-vehicle"/>
        <ViewVehicleSchedulesModal v-for="vehicle in vehicles" :key="'schedules-'+vehicle.uid" :id="'schedules-'+ vehicle.uid" :vehicle="vehicle" :type="'Bus'"/>
        <DeleteVehicleModal v-for="vehicle in vehicles" :key="'delete-'+vehicle.uid" :id="'delete-'+ vehicle.uid" :vehicle="vehicle"/>
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
//icons
import DeleteOutline from 'vue-material-design-icons/DeleteOutline.vue';
import Eye from 'vue-material-design-icons/Eye.vue';
// import Plus from 'vue-material-design-icons/Plus.vue';
import Calendar from 'vue-material-design-icons/Calendar.vue';

//modals
import ViewVehicleModal from '@/components/partials/ViewVehicleModal.vue';
import AddVehicleModal from '@/components/partials/AddVehicleModal.vue';
import ViewVehicleSchedulesModal from '@/components/partials/ViewVehicleSchedulesModal.vue';
import DeleteVehicleModal from '@/components/partials/DeleteVehicleModal.vue';

//tools
import M from 'materialize-css';

import db from './firebase/firebaseInit'
export default {
    name: 'vehiclesTable',
    components: {
        //icons
        Eye,
        // Plus,
        DeleteOutline,
        Calendar,

        //modals
        ViewVehicleModal,
        ViewVehicleSchedulesModal,
        DeleteVehicleModal,
        AddVehicleModal,
        // "modal": require("vue-materialize/modal")
    },
    data(){
        return {
            vehicles: []
        };
    },
    created(){
        db.collection('buses').orderBy('bus_code').get().then(querSnapshot => {
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