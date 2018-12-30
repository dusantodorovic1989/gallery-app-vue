<template>
  <div class="create-gallery">
    <h1>{{ editing ? 'Edit Gallery' : 'Create Gallery'}}</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Title</label>
        <input
          v-model="gallery.title"
          type="text"
          class="form-control"
          placeholder="Title"
          minlength="2"
          maxlength="255"
          required
        >

        <div class="form-group">
          <label>Description</label>
          <textarea
            v-model="gallery.description"
            type="text"
            class="form-control"
            placeholder="Description"
            maxlength="1000"
          ></textarea>
        </div>

        <label>Image URL</label>
        <div class="form-group" v-for="(n, index) in range" :key="index">
          <div class="input-group mb-3">
            <input
              v-model="images[index].image_url"
              type="url"
              class="form-control"
              placeholder="Image Url"
              required
            >
            <div class="input-group-append">
              <button
                type="button"
                class="btn btn-outline-dark btn-sm"
                @click="moveUp(index)"
                :disabled="(range == 1) || (!index)"
              >
                <i class="fas fa-arrow-up"></i>
              </button>
              <button
                type="button"
                class="btn btn-outline-dark btn-sm"
                @click="moveDown(index)"
                :disabled="(range == 1) || (index == range - 1)"
              >
                <i class="fas fa-arrow-down"></i>
              </button>
              <button
                type="button"
                class="btn btn-outline-dark btn-sm"
                @click="remove(index)"
                :disabled="range == 1"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <button type="button" class="btn btn-outline-dark" @click="addInput">Add Field</button>

      <button type="submit" class="btn btn-outline-dark">{{ editing ? 'Edit' : 'Create'}}</button>

      <button type="button" class="btn btn-outline-dark" @click="onCancel">Cancel</button>
    </form>
  </div>
</template>

<script>
import galleriesService from "./../services/galleries-service";
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      range: 1,
      gallery: {
        title: "",
        description: "",
        images: []
      },
      images: [{ image_url: "" }],
      errors: {},
      editing: false,
      galleryId: null
    };
  },
  methods: {
    addInput() {
      this.range++;
      this.images.push({ image_url: "" });
    },
    moveUp(index) {
      if (index) {
        this.images.splice(index - 1, 0, this.images.splice(index, 1)[0]);
      }
    },
    moveDown(index) {
      if (index != this.range - 1) {
        this.images.splice(index + 1, 0, this.images.splice(index, 1)[0]);
      }
    },
    remove(index) {
      if (this.range > 1) {
        this.range--;
        this.images.splice(index, 1);
      }
    },
    onSubmit() {
      if (this.images[0].image_url) {
        this.gallery.images = this.images;
      }
      if (this.editing) {
        this.editGallery();
      } else {
        this.createGallery();
      }
    },
    onCancel() {
      if (this.editing) {
        this.$router.push({
          name: "single-gallery",
          params: { id: this.gallery.id }
        });
      }
    },
    createGallery() {
      galleriesService
        .createGallery(this.gallery)
        .then(() => {
          this.errors = {};
          this.$router.push({ name: "my-galleries" });
        })
        .catch(errors => {
          this.errors = errors.response.data.errors;
        });
    },
    editGallery() {
      if (this.gallery.user.id == localStorage.getItem("id")) {
        galleriesService
          .editGallery(this.galleryId, this.gallery)
          .then(() => {
            this.errors = {};
            this.$router.push({
              name: "single-gallery",
              params: { id: this.galleryId }
            });
          })
          .catch(errors => {
            this.errors = errors.response.data.errors;
          });
      }
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.id) {
        vm.galleryId = to.params.id;
        vm.editing = true;
        galleriesService.getSingleGallery(vm.galleryId).then(response => {
          vm.gallery = response;
          vm.images = response.images;
          vm.range = response.images.length;
          if (vm.gallery.user.id != localStorage.getItem("id")) {
            vm.$router.push(from);
          }
        });
      }
    });
  }
};
</script>

<style scoped>
form {
  margin: 0 auto;
  width: 40%;
}
</style> 