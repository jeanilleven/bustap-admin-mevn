<template>
    <div id="add-terminal" class="modal">
        <div class="modal-content">
            <h4>Add a Terminal</h4>
            <div class="row">
                <form class="col s12" @submit.prevent="addTerminal">
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="new_terminal_code" type="text" class="validate" v-model="terminal.station_number" required>
                            <label for="new_terminal_code">Terminal Code</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="new_terminal_name" type="text" class="validate" v-model="terminal.name" required>
                            <label for="new_terminal_name">Terminal Name</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="new_street" type="text" class="validate" v-model="terminal.street" required>
                            <label for="new_street">Street Name</label>
                        </div>
                    </div>
                    <div class="input-field col s12">
                        <select class = "input-city" v-model="terminal.city" size = "5" required>
                            <option value="Alcantara">Alcantara</option>
                            <option value="Alcoy">Alcoy</option>
                            <option value="Alegria">Alegria</option>
                            <option value="Aloguinsan">Aloguinsan</option>
                            <option value="Argao">Argao</option>
                            <option value="Asturias">Asturias</option>
                            <option value="Badian">Badian</option>
                            <option value="Balamban">Balamban</option>
                            <option value="Bantayan">Bantayan</option>
                            <option value="Barile">Barile</option>
                            <option value="Bogo">Bogo</option>
                            <option value="Boljoon">Boljoon</option>
                            <option value="Borbon">Borbon</option>
                            <option value="Carcar">Carcar</option>
                            <option value="Carmen">Carmen</option>
                            <option value="Catmon">Catmon</option>
                            <option value="Cebu City">Cebu City</option>
                            <option value="Compostela">Compostela</option>
                            <option value="Consolacion">Consolacion</option>
                            <option value="Cordova">Cordova</option>
                            <option value="Daang-Bantayan">Daang-Bantayan</option>
                            <option value="Dalaguete">Dalaguete</option>
                            <option value="Danao City">Danao City</option>
                            <option value="Dumanjug">Dumanjug</option>
                            <option value="Ginatilan">Ginatilan</option>
                            <option value="Lapu-Lapu City">Lapu-Lapu City</option>
                            <option value="Liloan">Liloan</option>
                            <option value="Madridejos">Madridejos</option>
                            <option value="Malabuyoc">Malabuyoc</option>
                            <option value="Mandaue City">Mandaue City</option>
                            <option value="Medellin">Medellin</option>
                            <option value="Minglanilla">Minglanilla</option>
                            <option value="Moalboal">Moalboal</option>
                            <option value="Naga">Naga</option>
                            <option value="Oslob">Oslob</option>
                            <option value="Pilar">Pilar</option>
                            <option value="Pinamungahan">Pinamungahan</option>
                            <option value="Poro">Poro</option>
                            <option value="Ronda">Ronda</option>
                            <option value="Samboan">Samboan</option>
                            <option value="San Fernando">San Fernando</option>
                            <option value="San Francisco">San Francisco</option>
                            <option value="San Remegio">San Remegio</option>
                            <option value="Santa Fe">Santa Fe</option>
                            <option value="Santander">Santander</option>
                            <option value="Sibonga">Sibonga</option>
                            <option value="Sogod">Sogod</option>
                            <option value="Tabogon">Tabogon</option>
                            <option value="Tabuelan">Tabuelan</option>
                            <option value="Talisay">Talisay</option>
                            <option value="Toledo City">Toledo City</option>
                            <option value="Tuburan">Tuburan</option>
                            <option value="Tudela">Tudela</option>
                        </select>
                        <label>Select a City/Municipality</label>
                    </div>
                    <div class="input-field col s12">
                        <select v-model="terminal.province" required>
                            <option value="Cebu">Cebu</option>
                        </select>
                        <label>Select a Province</label>
                    </div>
                    <div class="input-field col s12">
                        <select v-model="terminal.country" required>
                            <option value="Philippines">Philippines</option>
                        </select>
                        <label>Select a Country</label>
                    </div>
                    <div class="modal-footer">
                        <a href="#!" class="modal-close waves-effect waves-green btn-flat cyan-text text-accent-4">Close</a>
                        <button type="submit"  v-bind:class="{'modal-close':toggleModalClose}" class="waves-effect waves-cyan btn cyan accent-4">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../firebase/firebaseInit'

export default {
    data(){
        return{
            toggleModalClose:false,
            terminal:{
                station_number: null,
                name: null,
                street: null,
                city: null,
                province: null,
                country: null,
            }
        }
    },
    methods:{
        addTerminal(){
            if(this.terminal.station_number!=null && this.terminal.name!=null && this.terminal.street!=null
                && this.terminal.city!=null && this.terminal.province!=null && this.terminal.country!=null){
                db.collection('terminals').add({
                    deleted: false,
                    station_number: this.terminal.station_number,
                    name: this.terminal.name,
                    street: this.terminal.street,
                    city: this.terminal.city,
                    province: this.terminal.province,
                    country: this.terminal.country
                }).catch( error => {
                    console.log(error)
                })
                this.toggleModalClose = true;
            }
        }
    }
}
</script>

<style lang="scss">
    #add-terminal .modal-footer{
        margin-bottom: 35%;
        a{
            &:nth-child(2){
                margin-right:2em ;
            }
        }
    }
</style>
