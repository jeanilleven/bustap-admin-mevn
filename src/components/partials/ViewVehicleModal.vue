<template>
    <div class="modal">
        <div class="modal-content">
            <table>

                        <h4>Code</h4>
                        <p>{{vehicle.bus_code}}</p>
                        <h4>Plate Number</h4>
                        <p>{{vehicle.plate_number}}</p>
        </table>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">close</a>
        </div>
    </div>
</template>

<script>
// import db from '../firebase/firebaseInit'

export default {
    props: ['vehicle'],
    data(){
    //    return {
    //        vehicles: []
    //    } 
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
        // db.collection('operators').doc(this.operator.uid).collection('owned_vehicles').get().then(querySnapshot => {
        //     querySnapshot.forEach(doc =>{
        //         doc.data().vehicle_ref.get().then(element => {
        //             const data = {
        //                 code: element.data().bus_code,
        //                 plateNumber: element.data().plate_number
        //             }

        //             this.vehicles.push(data)
        //         })
        //     })
        // })
    }
}
</script>