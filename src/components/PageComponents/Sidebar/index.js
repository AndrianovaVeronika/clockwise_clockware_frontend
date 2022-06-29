import {Menu, MenuItem, ProSidebar, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import {isAdminSelector, isAuthUserSelector} from "../../../store/selectors/authSelector";
import AddTaskIcon from '@mui/icons-material/AddTask';
import {useEffect, useState} from "react";
import useStyles from "../../../styles/useStyles";

const Sidebar = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const isAdmin = useSelector(isAdminSelector);
    const isAuth = useSelector(isAuthUserSelector);
    const classes = useStyles();

    useEffect(() => {
        setLoading(!isLoading);
    }, []);

    return (
        <ProSidebar className={classes.sidebar}>
            <Menu iconShape="square" className={classes.sidebarMenu}>
                {isAuth && <MenuItem icon={<AccountBoxIcon/>} onClick={() => navigate('/profile')}>Profile</MenuItem>}
                {isAdmin && <SubMenu title="Tables" icon={<BackupTableIcon/>}>
                    <MenuItem onClick={() => navigate('/admin/orders')}>Orders</MenuItem>
                    <MenuItem onClick={() => navigate('/admin/users')}>Users</MenuItem>
                    <MenuItem onClick={() => navigate('/admin/masters')}>Masters</MenuItem>
                    <MenuItem onClick={() => navigate('/admin/cities')}>Cities</MenuItem>
                </SubMenu>}
                {isAuth && <MenuItem icon={<LogoutIcon/>} onClick={() => navigate('/logout')}>Log out</MenuItem>}
            </Menu>
        </ProSidebar>
    )
}

export default Sidebar;