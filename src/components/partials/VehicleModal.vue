<template>
    <div class="modal">
        <div class="modal-content">
            <h4>{{operator.name + "'s " + ' Vehicles'}}</h4>
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Plate Number</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="vehicle in vehicles" v-bind:key="vehicle.code">
                        <th>{{vehicle.code}}</th>
                        <td>{{vehicle.plateNumber}}</td>

                    </tr> 
                </tbody>
        </table>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">close</a>
        </div>
    </div>
</template>

<script>
import db from '../firebase/firebaseInit'

export default {
    props: ['operator', 'type'],
    data(){
       return {
           vehicles: []
       } 
    },
    created(){
        // db.collection('buses').where('type', '==', 'Bus').get().then(querySnapshot =>{
        //     querySnapshot.forEach(doc => {
        //         const data = {
        //             code: doc.data().bus_code,
        //             plateNumber: doc.data().plate_number
        //         }

        //         this.vehicles.push(data)
        //     })
        // })
        db.collection('operators').doc(this.operator.uid).collection('owned_vehicles').get().then(querySnapshot => {
            querySnapshot.forEach(doc =>{
                doc.data().vehicle_ref.get().then(element => {
                    const data = {
                        code: element.data().bus_code,
                        plateNumber: element.data().plate_number
                    }

                    this.vehicles.push(data)
                })
            })
        })
    }
}
</script>