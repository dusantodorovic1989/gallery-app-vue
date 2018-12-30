<template>

  <div>
      <h1>aloooooo</h1>
    <div class="col-lg-6 portfolio-item" v-for="gallery in galleries" :key="gallery.id">
      <div class="card h-100">
        <img class="card-img-top" :src="gallery.images[0].image_url" alt>
        <div class="card-body">
          <router-link :to="{ name: 'single-gallery', params: { id: gallery.id }}">
            <h4 class="card-title">
              <a href="#">{{ gallery.title }}</a>
            </h4>
          </router-link>
          <p>Author:</p>
          <h4>{{ gallery.user.first_name }} {{ gallery.user.last_name }}</h4>
          <small>Created at: {{ gallery.created_at }}</small>
          <p class="card-text"></p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import galleriesService from "./../services/galleries-service";
import { mapGetters } from "vuex";
export default {
  name: "MyGalleries",
  components: {
    
  },
  data() {
    return {
      galleries: [],
      page: 1,
      term: ""
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  },
  methods: {
    loadMore() {
      this.page++;
      galleriesService
        .getUsersGalleries(this.$route.params.id, this.page, this.term)
        .then(galleries => {
          this.galleries.push(galleries);
        });
    },
    created() {
      console.log("disko")
    galleriesService
      .getUsersGalleries(this.user.id, this.page, this.term)
      .then(galleries => {
        this.galleries = galleries.data;
        console.log(this.galleries);
      });
  }
  }
}; 

</script>
