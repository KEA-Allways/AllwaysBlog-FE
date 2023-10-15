import React from 'react';
import BlogBody from "../components/BlogBody";
import Topbar from "../components/Topbar";

const BlogPage = () => {
    return (
        <>
        <div>
            <Topbar />
        </div>

        <hr/>
        
        <div>
            <BlogBody />
        </div>
        </>
        
    )
}

export default BlogPage;