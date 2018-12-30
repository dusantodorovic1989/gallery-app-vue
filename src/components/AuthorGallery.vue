<template>
  <div>
    <div class="col-lg-6 portfolio-item" v-for="gallery in usersGalleries" :key="gallery.id">
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
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "AuthorGallery",
  components: {

  },
  data() {
    return {
       page: 1,
       term: "",
    };
  },

  methods: {
    ...mapActions(['getUsersGalleries']),
    loadMore() {
      this.page++;
      this.getUsersGalleries(this.$route.params.id, this.page, this.term)
    },
     created() {
      this.getUsersGalleries(this.$route.params.id)
    },
  },

  computed: {
      ...mapGetters({
          usersGalleries: 'usersGalleries'
      })
  }
};

</script>