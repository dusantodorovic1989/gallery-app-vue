import http from './http-service';

class CommentService {
  addComment(galleryId, body) {
    return http.post(`galleries/${galleryId}/comments`, body);
  }
}

const commentService = new CommentService();

export default commentService;