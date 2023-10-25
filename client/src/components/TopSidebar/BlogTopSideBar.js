import BlogSidebar from "../Sidebar/BlogSidebar";
import SungjunTopbar from "../Topbar/SungjunTopbar";


const BlogTopSideBar = ({body}) => {
    return (
        <div>
            <SungjunTopbar/>
            <BlogSidebar body={body}/>
        </div>
    )
}

export default BlogTopSideBar;