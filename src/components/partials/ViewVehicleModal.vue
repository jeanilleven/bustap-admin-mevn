<template>
    <div class="modal">
        <div class="modal-content">
            <table>
                        
            <h4>{{vehicle.type}} Details</h4>
            <div class="row">
                <form class="col s12" @submit.prevent>
                    <div class="row">
                        <div class="input-field col s6">
                            <label for="bus_code">Bus Code</label>
                            <input :id="'bus_code-'+ vehicle.uid" type="text" class="validate" :value="vehicle.bus_code">
                        </div>
                        <div class="input-field col s6">
                            <label for="plate_number">Plate Number</label>
                            <input :id="'plate_number-'+ vehicle.uid" type="text" class="validate" :value="vehicle.plate_number">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="type">Vehicle Type</label>
                            <input :id="'type-'+ vehicle.uid" type="text" class="validate" :value="vehicle.type">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <button class="btn white-text green" v-on:click="update">Sumbit</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </table>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">close</a>
        </div>
    </div>
</template>

<script>
import db from '../firebase/firebaseInit'

import M from 'materialize-css'

export default {
    props: ['vehicle'],
    methods: {
        update: function(){
            var busCode = document.getElementById('bus_code-'+this.vehicle.uid).value;
            var plateNumber = document.getElementById('plate_number-'+this.vehicle.uid).value;
            var type = document.getElementById('type-'+this.vehicle.uid).value;
            db.collection('buses').doc(this.vehicle.uid).update({
                'bus_code': busCode,
                'plate_number': plateNumber,
                'type': type
            }).then(()=>{
                    console.log(busCode, plateNumber, type);
                }
            );
        }
    },
    created(){
        M.updateTextFields()
    }
}
</script>