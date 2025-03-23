import Post from "../models/post.model.js";

const addPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save(); // Chờ lưu vào database
        res.status(201).json({ message: "Bài viết đã được tạo", post });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const editPost = async (req, res) => {
    const { id } = req.params;
    
    try {
        const response = await Post.findByIdAndUpdate({ _id: id }, req.body);
        if (!response) {
            return res.status(404).json({ message: "Post is not existed" });
        }
        res.json({ message: "Edit successful" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params; 
    console.log(id);
    
    try {
        const response = await Post.findByIdAndDelete(id);
    
        if (!response) {
            return res.status(404).json({ message: "Post is not existed" });
        } 

        res.status(200).json({ message: "Delete successful" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        if (!posts) {
            return res.status(404).json({ message: "No post found" });
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post is not existed" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export { addPost, editPost, deletePost, getPosts, getPostById };