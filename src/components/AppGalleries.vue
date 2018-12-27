<template>
    <div>
       <div class="container">
                
            <div class="row" v-for="gallery in galleries" :key="gallery.id">
            <div class="col-lg-6 portfolio-item">
            <div class="card h-100">
                <!-- <a href="#">
                <img class="card-img-top" src="http://placehold.it/700x400" alt>
                
                </a> -->
                <img class="card-img-top" :src="gallery.images[0].image_url" alt>
                <div class="card-body">
                <h4 class="card-title">
                    <a href="#">{{ gallery.title }}</a>
                </h4>
                <p class="card-text">{{ gallery.description }}</p>
                </div>
            </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';



export default {
    name: 'AllGalleries',
    created() {
        this.getGalleries();
    },
    methods: {
        ...mapActions(['getGalleries'])
    },
    computed: {
        ...mapGetters({
            galleries: 'getGalleries'
        })
    }
}
</script>

<style>
</style>