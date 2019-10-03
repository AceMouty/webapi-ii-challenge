import React from 'react';

function Post({ post }) {
    return(
        <div className="post-card">
            <h2 className="post-card__title">
                {post.title}
            </h2>
            <p className="post-card__content">
                {post.contents}
            </p>
        </div>
    )
}

export default Post;