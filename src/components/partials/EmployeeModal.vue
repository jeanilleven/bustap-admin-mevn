<template>
    <div class="modal">
        <div class="modal-content">
            <h4>{{operator.name + "'s " + ' Employees'}}</h4>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>

                    </tr>
                    </thead>

                    <tbody>
                    <tr v-for="employee in employees" v-bind:key="employee.uid">
                        <th>{{employee.name}}</th>
                        <td>{{employee.email}}</td>
                        <td>{{employee.type}}</td>
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
    props: ['operator'],
    data(){
       return {
           employees: []
       } 
    },
    created(){
        db.collection('operators').doc(this.operator.uid).collection('employee_references').get().then(querySnapshot => {
            querySnapshot.forEach(doc =>{
                doc.data().employee_ref.get().then(element => {
                    const data = {
                        name: element.data().fname +' '+ element.data().lname,
                        email: element.data().email,
                        type: element.data().type
                    }

                    this.employees.push(data)
                })
            })
        })
    }
}
</script>