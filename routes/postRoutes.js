const express = require('express')
// Setup router to be used
const router = express.Router();
// Bring in data to be used
const Posts = require('../data/db');

// Routes for all end points with /api/posts in them

// GET: get all posts
router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json({data: posts})
    })
    .catch(err => res.status(500).json({message: "The posts information could not be retrieved." }))
})

// Export the route to be used
module.exports = router