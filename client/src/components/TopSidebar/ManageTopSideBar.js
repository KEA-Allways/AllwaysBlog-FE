import ManageSidebar from "../Sidebar/ManageSidebar";
import Topbar from "../Topbar/Topbar";


const ManageTopSideBar = ({ HeaderTitle, HeaderButton, HeaderAction, Container, isLogin, hasBlog, username }) => {

    return (
        <div>
            <Topbar page={"mngt"} isLogin={isLogin} hasBlog={hasBlog} username={username}/>
            <ManageSidebar 
                HeaderTitle={HeaderTitle} 
                HeaderButton={HeaderButton} 
                HeaderAction={HeaderAction} 
                BodyContainer={Container} />
        </div>
    )
}

export default ManageTopSideBar;