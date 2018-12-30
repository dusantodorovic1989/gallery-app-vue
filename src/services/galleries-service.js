import http from './http-service';

class GalleriesService {
    getGalleries(page = 1, term = '') {
        return http
          .get(`galleries?page=${page}&term=${term}`)
          .then(({ data }) => data.galleries);
    }
    getSingleGallery(id) {
        return http.get(`galleries/${id}`).then(({ data }) => data);
      }

    getUsersGalleries(id, page = 1, term = '') {
        return http
          .get(`author-galleries/${id}`, { params: { page, term } })
          .then(({ data }) => data.galleries);
    }  
}

const galleriesService = new GalleriesService();

export default galleriesService;