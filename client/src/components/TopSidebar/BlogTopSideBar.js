import BlogSidebar from "../Sidebar/BlogSidebar";
import Topbar from "../Topbar/Topbar";


const BlogTopSideBar = ({isLogin, hasBlog, username, body}) => {
    return (
        <div>
            <Topbar page={"blog"} isLogin={isLogin} hasBlog={hasBlog} username={username}/>
            <BlogSidebar body={body}/>
        </div>
    )
}

export default BlogTopSideBar;