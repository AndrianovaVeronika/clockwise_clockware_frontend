import {Menu, MenuItem, ProSidebar, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import {logOut} from "../../../store/actions/auth";
import {isAdminSelector} from "../../../store/selectors/authSelector";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAdmin = useSelector(isAdminSelector);

    return (
        <>
            <ProSidebar style={{marginLeft: '-10px', backgroundColor: '#1d1d1d'}}>
                <Menu iconShape="square"
                      style={{
                          height: 'auto',
                          width: '250px',
                          marginTop: '50px',
                          backgroundColor: '#1d1d1d',
                          marginLeft: '10px',
                          marginRight: '10px'
                      }}>
                    <MenuItem icon={<AccountBoxIcon/>} onClick={() => navigate('/profile')}>Profile</MenuItem>
                    {isAdmin && <SubMenu title="Tables" icon={<BackupTableIcon/>}>
                        <MenuItem onClick={() => navigate('/admin/orders')}>Orders</MenuItem>
                        <MenuItem onClick={() => navigate('/admin/users')}>Users</MenuItem>
                        <MenuItem onClick={() => navigate('/admin/masters')}>Masters</MenuItem>
                        <MenuItem onClick={() => navigate('/admin/cities')}>Cities</MenuItem>
                    </SubMenu>}
                    <MenuItem icon={<LogoutIcon/>} onClick={() => {
                        dispatch(logOut());
                        navigate('/');
                    }}>Log out</MenuItem>
                </Menu>
            </ProSidebar>
        </>
    )
}

export default Sidebar;