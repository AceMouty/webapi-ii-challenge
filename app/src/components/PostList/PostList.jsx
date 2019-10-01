import React from 'react';
// Bring in axios to make a HTTP req
import axios from 'axios'

// Bring in Post component
import Post from '../Post/Post'

function PostList() {
    // Local state to hold all the post in the DB
    const [posts, setPost] = React.useState([])

    // UseEffect: grabs all post from the db on inital render
    React.useEffect(() => {
        axios.get("http://localhost:8000/api/posts")
        .then(res => {
            setPost(res.data.data)
        })
    }, [posts])

    return(
        <div>
            <h2>Here are all the posts we have on file</h2>
            <div className="post-container">
                {posts.map(post => <Post post={post}/>)}
            </div>
        </div>
    )
}

export default PostList;