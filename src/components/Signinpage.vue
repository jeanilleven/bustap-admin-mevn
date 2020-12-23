<template>
    <div class = "container">
        <div class = "row">
            <div class = "col s12 blank-1">
                <h5>Welcome back!</h5>
                <h4><strong>Login to your account.</strong></h4>
            </div>
        </div>
        <form @submit.prevent="login">
            <div class = "row input-1">
                <div class = "col s3">
                </div>
                <div class = "input-field col s6">
                    <input id="login_username" type="email" class="validate" v-model="email" required>
                    <label for="login_username">Email</label>
                </div>
                <div class = "col s3">
                </div>
            </div>
            <div class = "row input-1">
                <div class = "col s3">
                </div>
                <div class = "input-field col s6">
                    <input id="login_password" type="password" class="validate" v-model="password" required>
                    <label for="login_password">Password</label>
                </div>
                <div class = "col s3">
                </div>
            </div>
            <div class="row login-button">
                <div class = "col s3">
                </div>
                <div class = "col s6">
                    <button type="submit" class="waves-effect waves-cyan btn cyan accent-4 login-btn"><strong>Login</strong></button>
                </div>
                <div class = "col s3">
                </div>
            </div>
        </form>
    </div>
</template>

<script>

import firebase from 'firebase'

export default {
    data(){
        return {
            email: null,
            password: null
        }
    },
    methods:{
        login(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() =>{
                alert(`You are now logged in`)
                this.$router.push('/operators')
                location.reload();
            },
            err => {
                alert(err.message)
            })
            // console.log(this.email + ' ' + this.password)
        }
    }
}
</script>

<style lang = "scss">
    .blank-1{
        height: 100px;
        margin-right: auto;
        margin-right: auto;
        margin-top: 50px;
        text-align: center;
    }
    .blank-1 h4, .blank-1 h5, .input-1{
        margin: 0;
        padding: 0;
    }
    .login-btn {
        width: 100%;
    }
</style>