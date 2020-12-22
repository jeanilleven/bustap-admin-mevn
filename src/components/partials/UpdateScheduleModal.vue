<template>
<div>
    <h4>Edit <strong>{{vehicle.bus_code}}</strong> Schedule</h4>
    <div class="row">
        <input type="datetime-local" :id="'update-datetime-'+vehicle.uid" :value="this.schedule.datetime.toDate().addHours(8).toISOString().replace('Z', '')">
    </div>
    <div class="input-field col s12">
        <select class="browser-default" style="display:block" name="select-terminal" :id="'update-terminal-'+vehicle.uid">
            <option :value="schedule.terminalObject.uid">{{schedule.terminalObject.station_number}}</option>
            <option v-for="terminal in terminals" v-bind:key="'options-'+terminal.uid" :value="terminal.uid">{{terminal.station_number}}</option>
        </select>
    </div>
    <button class="btn-flat white-text pl-4 green" v-on:click="updateSchedule">Update Schedule</button>
</div>
</template>
<style lang="scss">
.customLabel {
    color: rgb(180, 180, 180);

}
</style>
<script>
// import db from '../firebase/firebaseInit'

import M from 'materialize-css'
// import { Router } from 'express';

export default {
    props: ['vehicle', 'terminals', 'schedule'],
    methods: {
        updateSchedule: function(){
            // var currentVehicle = this.vehicle;

            var dateTime = new Date(document.getElementById('update-datetime-'+this.vehicle.uid).value);
            var term = document.getElementById('update-terminal-'+this.vehicle.uid).value;
            console.log("UPDATE DATE: "+ dateTime);
            console.log("UPDATE TERMINAL: "+ term);


            // uid = document.getElementById('update-terminal-'+this.vehicle.uid).value;
            // var terminal = this.terminals.find(checkTerminalId);
            // console.log('CURRENT VEHICLE: ' + currentVehicle.uid);
            // console.log('DATETIME: ' + dateTime);
            // console.log('TERMINAL: '+ terminal);
            // db.collection('busSchedules').doc(this.currentSchedule.uid).update({
            //     'datetime': dateTime,
            //     'deleted': false,
            //     'terminal_code': terminal.station_number,
            //     'terminal_id': db.collection('terminals').doc(terminal.uid),
            //     'type': currentVehicle.type,
            //     'vehicle_code': currentVehicle.bus_code,
            //     'vehicle_id': db.collection('buses').doc(currentVehicle.uid)
            // });
            // location.reload();
        },
    },
    created(){
        Date.prototype.addHours = function(h) {
            this.setTime(this.getTime() + (h*60*60*1000));
            return this;
        }
        // var d = new Date(this.schedule.datetime.toDate())
        console.log(this.schedule.datetime.toDate().toISOString().replace('Z', ''));
        M.updateTextFields()
    }
}
</script>