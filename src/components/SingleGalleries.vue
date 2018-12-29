<template>
  <div>
    <h1 class="title">{{ gallery.title }}</h1>Author
    <router-link to=" name: 'authors-gallery', params: { id: userId }}">
      <h4 class="title author">{{ gallery.user.first_name + " " + gallery.user.last_name}}</h4>
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
    <hr>
      <div class="container" v-for="comment in gallery.comments" :key="comment.id">
      <p class="comment-author">{{ comment.body }}</p>
      <p class="comment-author">Author: {{ comment.user.first_name }} {{ comment.user.last_name }}</p>
      <p class="comment-author">Created :{{ comment.created_at}}</p>
      
      <hr>
    </div>
    <div v-if="user">
      <b-form-textarea
        id="textarea1"
        v-model="newComment.body"
        placeholder="Enter something"
        :rows="3"
        :max-rows="6"
      ></b-form-textarea>
      <b-button variant="outline-secondary" class="comment-button" @click="addComment">Submit</b-button>
    </div>
  </div>
</template>

<script>
import BCarousel from "bootstrap-vue/es/components/carousel/carousel";
import BCarouselSlide from "bootstrap-vue/es/components/carousel/carousel";

import galleriesService from "./../services/galleries-service";
import commentService from "./../services/comment-service";
import {mapGetters} from 'vuex';
export default {
  name: "Singlegallery",
  data() {
    return {
      gallery: Object,
      slide: 0,
      sliding: null,
      newComment: {},
    };
  },
  // components(){
  //     BCarousel,
  //     BCarouselSlide

  // },
  computed: {
      ...mapGetters({
          user: 'getUser'
      })
  },
  methods: {
       addComment() {
      commentService
        .addComment(this.$route.params.id, this.newComment)
        .then(response => {
          this.gallery.comments.push(response.data[0]);
          this.newComment = "";
        })
        .catch(error => {
          this.errors = error;
        });
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  },
  beforeRouteEnter(to, from, next) {
    galleriesService.getSingleGallery(to.params.id).then(gallery => {
      next(vm => {
        vm.gallery = gallery;
        //vm.userId = gallery.user_id;
        vm.username = gallery.user.first_name + " " + gallery.user.last_name;
        
      });
    });
  },
  
};
</script>

<style>
</style>


