const express = require('express')
// Setup router to be used
const router = express.Router();
// Bring in data to be used
const Posts = require('../data/db');

// Routes for all end points with /api/posts in them

// POST - /api/posts : Create a new post
router.post('/', (req, res) => {
    
    const post = req.body;
    // Check the data coming in
    if(!post.title || !post.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }

    // Create the post if the data is all there
    Posts.insert(req.body)
    .then(postId => {
  
        Posts.findById(postId.id)
        .then(newPost => {
            res.status(201).json({data: newPost})
        })
        
    })
    .catch(err => {
        res.status(500).json({error: "There was an error while saving the post to the database", dbError: err})
    })
})

// POST - /api/posts/:id/comments: adds a new comment to a post
router.post("/:id/comments", (req, res) => {
    const postId = req.body.post_id;
    // Check for text property
    if(!req.body.text){
        res.status(400).json({errorMessage: "Please provide text for the comment." })
    } else if (postId != req.params.id) {
        res.status(400).json({message: "The post_id does not match"})
    }
    // Find the post for the ID passed in the body
    Posts.findById(postId)
    .then(post => {
        console.log(post)
        // If post exist insert it and return the new comment else res with an err
        if(post.length > 0){
            Posts.insertComment(req.body)
            .then( commentId => {
                console.log(commentId)
                Posts.findCommentById(commentId.id)
                .then(newComment => {
                    res.status(201).json({data: newComment});
                })
            })
            .catch(err => {
                res.status(500).json({error: "There was an error while saving the comment to the database"})
            })
        } else {
            res.status(404).json({errorMessage: "The post for the specified ID does not exist" })
        }
    })
})

// GET: get all posts
router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json({data: posts})
    })
    .catch(err => res.status(500).json({message: "The posts information could not be retrieved." }))
})

// GET - /api/post/:id : get a specific post
router.get("/:id", (req, res) => {
    const postID = req.params.id
    Posts.findById(postID)
    .then(post => {
        if(post.length > 0){
            res.status(200).json({data: post[0]})
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({error: "The comments information could not be retrieved." })
    })
})

// GET - /api/posts/:id/comments : get all comments for a specific post
router.get("/:id/comments", (req, res) => {
    const postId = req.params.id
    Posts.findPostComments(postId)
    .then(comments => {
        if(comments.length > 0 ){
            res.status(200).json({data: comments})
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({error: "The comments information could not be retrieved."})
    })
})

// DELETE - /api/post/:id : will delete a specific post
router.delete("/:id", (req, res) => {
    const postId = req.params.id

    Posts.findById(postId)
    .then(post => {
        if(post.length > 0){
            res.status(200).json({data: post[0]})
            Posts.remove(postId)
            .catch(err => res.status(500).json({error: "The post could not be removed"}))
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
})

// PUT - /api/posts/:id : updates a specified post and returns the updated copy
router.put("/:id", (req, res) => {
    const postId = req.params.id;
    const content = req.body

    // Check that all data is passed in
    if(!content.title || !content.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }

    Posts.findById(postId)
    .then( post => {
        console.log("FROM THE FINDBY", post)
        if(post.length > 0){
            Posts.update(postId, content)
            .then(updated => {
                if(updated !== 0){
                    Posts.findById(postId)
                    .then(updatedPost => {
                        res.status(200).json({data: updatedPost})
                    })
                }
            })
            .catch(err => res.status(500).json({error: "The post information could not be modified."}))
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
})

// Export the route to be used
module.exports = router