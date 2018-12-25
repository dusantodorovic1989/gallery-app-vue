<template>
    <div>
        <h1>HELLO</h1>
        <div class="container">
						<ul v-for="gallery in galleries" :key="gallery.id">
							<li>{{ gallery.id }}</li>
							<li>{{ gallery.title }}</li>
							<li>{{ gallery.description }}</li>
							<li>{{ gallery.user_id }}</li>
						</ul>
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