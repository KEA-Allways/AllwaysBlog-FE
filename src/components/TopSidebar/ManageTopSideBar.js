import ManageSidebar from "../Sidebar/ManageSidebar";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";


const ManageTopSideBar = ({Container}) => {
    return (
        <div>
            <Topbar />
            <ManageSidebar bodyContainer={Container} />
        </div>
    )
}

export default ManageTopSideBar;