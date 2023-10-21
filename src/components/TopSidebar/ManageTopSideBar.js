import ManageSidebar from "../Sidebar/ManageSidebar";
import Topbar from "../Topbar/Topbar";


const ManageTopSideBar = ({ HeaderTitle, HeaderButton, Container }) => {
    return (
        <div>
            <Topbar page={"mngt"} />
            <ManageSidebar HeaderTitle={HeaderTitle} HeaderButton={HeaderButton} BodyContainer={Container} />
        </div>
    )
}

export default ManageTopSideBar;