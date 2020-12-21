<template>
    <div class="modal">
        <div class="modal-content">
            <table>
                        
            <h4>Add Vehicle</h4>
            <div class="row">
                <form class="col s12" @submit.prevent>
                    <div class="row">
                        <div class="input-field col s6">
                            <label for="bus_code">Bus Code</label>
                            <input id="add-bus_code" type="text" class="validate" value="">
                        </div>
                        <div class="input-field col s6">
                            <label for="plate_number">Plate Number</label>
                            <input id="add-plate_number" type="text" class="validate" value="">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="type">Manufacturer</label>
                            <input id='add-manufacturer' type="text" class="validate" value="">
                        </div>
                        <div class="input-field col s12">
                            <p class="customLabel" >Vehicle Type</p>
                            <select name="type" id = "add-type">
                                <option value="Jeepney">Jeepney</option>
                                <option value="Bus">Bus</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="type">Capacity</label>
                            <input id='add-capacity' type="text" class="validate">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <button class="btn white-text green" v-on:click="update">Sumbit Edits</button>
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
<style lang="scss">
.customLabel {
    color: rgb(180, 180, 180);

}
</style>
<script>
import db from '../firebase/firebaseInit'

import M from 'materialize-css'
// import { Router } from 'express';

export default {
    methods: {
        update: function(){
            var busCode = document.getElementById('bus_code-'+this.vehicle.uid).value;
            var plateNumber = document.getElementById('plate_number-'+this.vehicle.uid).value;
            var type = document.getElementById('type-'+this.vehicle.uid).value;
            db.collection('buses').doc(this.vehicle.uid).add({
                'bus_code': busCode,
                'plate_number': plateNumber,
                'type': type
            }).then(()=>{
                    console.log(busCode, plateNumber, type);
                   location.reload();
                }
            );
        }
    },
    created(){
        M.updateTextFields()
    }
}
</script>