const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Post = require('../models/Post')

//@route GET api/posts
//@desc get posts 
//@access private
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username'])
        res.json({ success: true, posts })

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal serve error' })
    }
})



//@route POST api/posts
//@desc Create posts 
//@access private

router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    //simple validated
    if (!title) {
        return res.status(400).json({ success: false, message: "title is required" })
    }

    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('http://' && 'https://') ? url : `http://${url}`,
            status: status || 'To Learn',
            user: req.userId
        })

        await newPost.save()

        res.json({ success: true, message: 'Happy learning', post: newPost })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@route PUT api/posts
//@desc PUT posts 
//@access private


router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    //simple validated
    if (!title) {
        return res.status(400).json({ success: false, message: "title is required" })
    }

    try {
        //update post
        let updatePost = {
            title,
            description: description || '',
            url: url.startsWith('http://' && 'https://') ? url : `http://${url}` || '',
            status: status || 'To Learn',
        }

        const postUpdateCondition = { _id: req.params.id, user: req.userId }

        updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, { new: true });

        //User not authorized to update post or post not found
        if (!updatePost) return res.status(401).json({ success: false, message: 'Post not found or not authorized' });

        res.json({ success: true, message: 'Excellent proress !!!', post: updatePost })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@route DELETE api/posts
//@desc DELETE posts 
//@access private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

        //user not authorized or post not found
        if (!deletedPost) return res.status(401).json({ success: false, message: 'Post not found or not authorized' });

        res.json({ success: true, message: 'Excellent proress !!!', post: deletedPost })
    } catch (err) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


module.exports = router