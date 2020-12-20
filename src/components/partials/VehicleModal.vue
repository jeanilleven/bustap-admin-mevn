<template>
    <div id="vehicle-modal" class="modal">
        <div class="modal-content">
            <h4>{{operator.name}}</h4>
            <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['operator']
}
</script>