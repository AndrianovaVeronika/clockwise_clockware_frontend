import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {getCurrentUserSelector} from "../../../store/selectors/authSelector";

const Sidebar = () => {
    const user = useSelector(getCurrentUserSelector);
    const navigate = useNavigate();

    return (
        <div style={{width: '300px', height: '700px'}}>
            <ProSidebar>
                <Menu iconShape="square">
                    <MenuItem icon={<AccountBoxIcon/>} onClick={()=>navigate('/profile')}>Profile</MenuItem>
                    <SubMenu title="Tables" icon={<BackupTableIcon/>}>
                        <MenuItem onClick={() => navigate('/admin/orders')}>Orders</MenuItem>
                        <MenuItem onClick={() => navigate('/admin/users')}>Users</MenuItem>
                        <MenuItem onClick={() => navigate('/admin/masters')}>Masters</MenuItem>
                        <MenuItem onClick={() => navigate('/admin/cities')}>Cities</MenuItem>
                    </SubMenu>
                </Menu>
            </ProSidebar>
        </div>
    )
}

export default Sidebar;