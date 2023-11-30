import BlogSidebar from "../Sidebar/BlogSidebar";
import Topbar from "../Topbar/Topbar";


const BlogTopSideBar = ({body, currentPage}) => {
    return (
        <div>
            <Topbar/>
            <BlogSidebar body={body} currentPage={currentPage}/>
        </div>
    )
}

export default BlogTopSideBar;