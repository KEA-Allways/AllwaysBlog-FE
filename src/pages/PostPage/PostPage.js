import React from 'react';
import BlogTopbar from "../../components/Topbar/BlogTopbar"
import PostEditor from "../../components/PostEditor/PostEditor"

const PostPage = () => {
    return (
      <div>
        <BlogTopbar />
        <hr />
        <PostEditor />
      </div>
    );
  };

export default PostPage;