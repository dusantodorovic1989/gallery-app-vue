<template>
  <div>
    <h1 class="title">{{ gallery.title }}</h1>Author
    <router-link to="#">
      <h4 class="title author">{{ gallery.user.first_name }} {{ gallery.user.last_name }}</h4>
    </router-link>Created At:
    <small class="title">{{ gallery.created_at }}</small>
    <h4 class="card h-100">{{ gallery.description }}</h4>
    <div>
      <b-carousel
        id="carousel1"
        controls
        indicators
        :interval="4000"
        img-width="1024"
        img-height="480"
        v-model="slide"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <div v-for="image in gallery.images" :key="image.id">
          <a :href="image.image_url" target="_blank">
            <b-carousel-slide>
              <img
                slot="img"
                class="d-block img-fluid w-100"
                :src="image.image_url"
                alt="image slot"
              >
            </b-carousel-slide>
          </a>
        </div>
      </b-carousel>
    </div>
  </div>
</template>

<script>
import BCarousel from "bootstrap-vue/es/components/carousel/carousel";
import BCarouselSlide from "bootstrap-vue/es/components/carousel/carousel";

import galleriesService from "./../services/galleries-service";

export default {
  name: "Singlegallery",
  data() {
    return {
      gallery: Object,
      slide: 0,
      sliding: null,
    };
  },
  components(){
      BCarousel,
      BCarouselSlide

  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  },
  beforeRouteEnter(to, from, next) {
    galleriesService.getSingleGallery(to.params.id).then(response => {
      next(vm => {
        vm.gallery = response.data;
      });
    });
  }
};
</script>

<style>
</style>


