import express from 'express';
import {
    addComment,
    getCommentsByPostId,
    deleteComment
} from '../controllers/comment.js'; // adjust path as necessary

const router = express.Router();

router.post('/posts/:postId/comments', addComment);
router.get('/posts/:postId/comments', getCommentsByPostId);
router.delete('/comments/:id', deleteComment);

export default router;
