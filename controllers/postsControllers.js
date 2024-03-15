import Posts from "../models/Posts.js";


const createPost = async (req, res) => {
    const { title, post_body} = req.body;

    if (Object.values(post_body).includes("") || Object.values(title).includes("")) {
        const error = new Error("Todos los campos son obligatorios");
        return res.status(400).json({ msg: error.message });
    }

    try {
        const newPost = new Posts(req.body);
        await newPost.save();
        const message = "Post creado correctamente";
        res.json(message);
    } catch (error) {
       console.log(error);
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.json(posts);
    } catch {
        const error = new Error("Error al obtener los posts");
        return res.status(400).json({ msg: error.message });
    }
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Posts.findById(id);
        res.json(post)  
    } catch  {
        const error = new Error("Error al obtener el post");
        return res.status(400).json({ msg: error.msg });
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await Posts.findByIdAndDelete(id);
        const message = "Post eliminado correctamente";
        res.json(message);
    } catch {
        const error = new Error("Error al eliminar el post");
        return res.status(400).json({ msg: error.msg });
    }
    }


const editPost = async (req, res) => {
    const { id } = req.params;
    const { title, post_body, image } = req.body;
    try {
        const post = await Posts.findById(id);
        post.title = title || post.title;
        post.post_body = post_body || post.post_body;
        post.image = image || post.image;
        await post.save();
        const message = "Post editado correctamente";
        res.json(message);
    } catch {
        const error = new Error("Error al editar el post");
        return res.status(400).json({ msg: error.msg });
    }
}


export { createPost, getPosts , getPostById , deletePost , editPost}