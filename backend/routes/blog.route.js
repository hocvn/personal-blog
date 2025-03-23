import { Router } from 'express';
import { addPost, editPost, deletePost, getPostById, getPosts } from "../controllers/blog.controller.js";

const router = Router();

// Routes
router.post('/add', addPost);

router.put('/edit/:id', editPost);

router.delete('/delete/:id', deletePost);

router.get('/', getPosts);

router.get('/:id', getPostById);

export default router;