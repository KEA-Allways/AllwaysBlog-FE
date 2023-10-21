import BlogSidebar from "../Sidebar/BlogSidebar";
import Topbar from "../Topbar/Topbar";


const BlogTopSideBar = ({body}) => {
    return (
        <div>
            <Topbar page={"blog"} />
            <BlogSidebar body={body}/>
        </div>
    )
}

export default BlogTopSideBar;