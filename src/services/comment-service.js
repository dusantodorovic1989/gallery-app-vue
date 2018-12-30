import http from './http-service';

class CommentService {
   addComment(galleryId, body) {
    return http
      .post(`galleries/${galleryId}/comments`, body)
      .then(({ data }) => data);
}
  delete(id) {
    return http.delete(`comments/${id}`);
  }
}

const commentService = new CommentService();

export default commentService;