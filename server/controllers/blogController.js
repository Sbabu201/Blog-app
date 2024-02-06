const blogModel = require("../models/blogModel")
const userModel = require("../models/userModel");
exports.getAllBlogsController = async (req, res) => {
    try {
        const blog = await blogModel.find().populate("user");
        if (!blog) {
            return res.status(401).send({
                message: "can't get blogs",
                success: false
            })
        }
        return res.status(201).send({
            message: "got all blogs successfully",
            success: true,
            blog
        })
    }
    catch (error) {
        return res.status(401).send({
            message: "something went wrong",
            success: false,
            error
        })
    }
}
exports.addBlogsController = async (req, res) => {
    try {
        console.log('req.body', req.body)
        const { name, description, image, user } = req.body;
        if (!name || !description || !image || !user) {
            return res.status(401).send({
                message: "enter the data correctly",
                success: false
            })
        }
        const blog = new blogModel({ name, description, image, user, like: 0 });
        await blog.save();
        const userId = await userModel.findById(user);
        if (!userId) {
            return res.status(404).json({ error: 'User not found' });
        }

        userId.blogs.push(blog._id);
        await userId.save();
        return res.status(201).send({
            message: "successful",
            success: true,
            blog
        })

    } catch (error) {
        console.log(error);
        return res.status(401).send({
            message: "error occured",
            success: false,
            error
        })
    }
}
exports.deleteBlogController = async (req, res) => {
    try {
        const deleteBlog = await blogModel.findByIdAndDelete(req.params.id);
        return res.status(201).send({
            message: "deleted ",
            success: true,
            deleteBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            message: "error occured",
            success: false,
            error
        })
    }

}
exports.blogUserController = async (req, res) => {

    try {

        const myBlog = await userModel.findById(req.params.id).populate("blogs");
        console.log('myBlog', myBlog)
        return res.status(201).send({
            message: "blog got by id ",
            success: true,
            myBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            message: "error occured",
            success: false,
            error
        })
    }
}
exports.editBlogUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, image, user } = req.body;

        const editBlog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(201).send({
            message: "updated successfully ",
            success: true,
            editBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            message: "error occured",
            success: false,
            error
        })
    }
}
exports.blogByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const viewBlog = await blogModel.findOne({ _id: id });
        console.log(viewBlog)
        return res.status(201).send({
            message: "find successfully ",
            success: true,
            viewBlog
        });
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            message: "error occured",
            success: false,
            error
        })
    }
}
exports.likeOfBlogController = async (req, res) => {
    try {
        const id = req.params.id;
        //   console.log('id', id)
        const { like } = req.body;
        const likedBlog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(201).send({
            message: "liked successfully successfully ",
            success: true,
            likedBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            message: "error occured",
            success: false,
            error
        })
    }
}
