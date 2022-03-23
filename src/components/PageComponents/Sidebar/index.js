import {Menu, MenuItem, ProSidebar, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import {isAdminSelector} from "../../../store/selectors/authSelector";
import AddTaskIcon from '@mui/icons-material/AddTask';
import {useEffect, useState} from "react";

const Sidebar = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const isAdmin = useSelector(isAdminSelector);

    useEffect(() => {
        setLoading(!isLoading);
    }, []);

    return (
        <>
            <ProSidebar style={{height: 'inherit', backgroundColor: '#1d1d1d'}}>
                <Menu iconShape="square"
                      style={{
                          width: '200px',
                          marginTop: '100px',
                          backgroundColor: '#1d1d1d',
                          marginLeft: '10px',
                          marginRight: '10px'
                      }}>
                    <MenuItem icon={<AccountBoxIcon/>} onClick={() => navigate('/profile')}>Profile</MenuItem>
                    <MenuItem icon={<AddTaskIcon/>} onClick={() => navigate('/add/order')}>Order</MenuItem>
                    {isAdmin && <SubMenu title="Tables" icon={<BackupTableIcon/>}>
                        <MenuItem onClick={() => navigate('/admin/orders')}>Orders</MenuItem>
                        <MenuItem onClick={() => navigate('/admin/users')}>Users</MenuItem>
                        <MenuItem onClick={() => navigate('/admin/masters')}>Masters</MenuItem>
                        <MenuItem onClick={() => navigate('/admin/cities')}>Cities</MenuItem>
                    </SubMenu>}
                    <MenuItem icon={<LogoutIcon/>} onClick={() => navigate('/logout')}>Log out</MenuItem>
                </Menu>
            </ProSidebar>
        </>
    )
}

export default Sidebar;