import ManageSidebar from "../Sidebar/ManageSidebar";
import SungjunTopbar from "../Topbar/SungjunTopbar";


const ManageTopSideBar = ({ HeaderTitle, HeaderButton, HeaderAction, Container}) => {

    return (
        <div>
            <SungjunTopbar/>
            <ManageSidebar 
                HeaderTitle={HeaderTitle} 
                HeaderButton={HeaderButton} 
                HeaderAction={HeaderAction} 
                BodyContainer={Container} />
        </div>
    )
}

export default ManageTopSideBar;