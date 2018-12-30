<template>
   <div>
      <div class="container">
           <div class="row" v-for="gallery in galleries" :key="gallery.id">
               <div class="col-lg-6 portfolio-item">
                   <div class="card h-100">   <img class="card-img-top" :src="gallery.images[0].image_url" alt>
                       <div class="card-body">
                       <router-link :to="{ name: 'single-gallery', params: { id: gallery.id }}">
                           <h4 class="card-title">
                               <a href="#">{{ gallery.title }}</a>
                           </h4>
                       </router-link>                        <p>Author:</p>
                       <router-link :to="{ name: 'author-galleries', params: { id: gallery.user.id }}">
                           <h4>{{ gallery.user.first_name }} {{ gallery.user.last_name }}</h4>
                       </router-link>
                        <small>Created at: {{ gallery.created_at }}</small>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
</template><script>
import { mapGetters, mapActions } from 'vuex';export default {
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


<style scoped>
.container {
  display: flex center;
  width: 150%;
  margin-bottom: 40px;
  
}
</style>