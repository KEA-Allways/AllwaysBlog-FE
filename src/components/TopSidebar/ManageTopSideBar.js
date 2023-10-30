import ManageSidebar from "../Sidebar/ManageSidebar";
import Topbar from "../Topbar/Topbar";


const ManageTopSideBar = ({ HeaderTitle, HeaderButton,HeaderButton2, HeaderAction, Container}) => {

    return (
        <div>
            <Topbar />
            <ManageSidebar 
                HeaderTitle={HeaderTitle} 
                HeaderButton={HeaderButton} 
                HeaderButton2={HeaderButton2}
                HeaderAction={HeaderAction} 
                BodyContainer={Container} />
        </div>
    )
}

export default ManageTopSideBar;