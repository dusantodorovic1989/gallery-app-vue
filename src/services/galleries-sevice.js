import http from './http-service';

class GalleriesService {
    getGalleries() {
        return http.get('galleries')
            .then(({data}) => data);
    }
}

const galleriesService = new GalleriesService();

export default galleriesService;