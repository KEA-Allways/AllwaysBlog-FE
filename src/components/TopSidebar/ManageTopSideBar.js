import ManageSidebar from "../Sidebar/ManageSidebar";
import Topbar from "../Topbar/Topbar";


const ManageTopSideBar = ({ HeaderTitle, HeaderButton, HeaderAction, Container }) => {

    return (
        <div>
            <Topbar page={"mngt"} />
            <ManageSidebar HeaderTitle={HeaderTitle} HeaderButton={HeaderButton} HeaderAction={HeaderAction} BodyContainer={Container} />
        </div>
    )
}

export default ManageTopSideBar;