import {Menu, MenuItem, ProSidebar, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import {isAdminSelector, isAuthUserSelector, isMasterSelector} from "../../../store/selectors/authSelector";
import {useEffect, useState} from "react";
import useStyles from "../../../styles/useStyles";
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutAlertDialog from "../../Dialogs/LogoutAlertDialog";

const Sidebar = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const isAdmin = useSelector(isAdminSelector);
    const isAuth = useSelector(isAuthUserSelector);
    const isMaster = useSelector(isMasterSelector);
    const classes = useStyles();

    useEffect(() => {
        setLoading(!isLoading);
    }, []);

    return (
        <ProSidebar className={classes.sidebar}>
            <Menu iconShape="square" className={classes.sidebarMenu}>
                {isAuth && <>
                    <MenuItem icon={<AccountBoxIcon/>} onClick={() => navigate('/profile')}>Profile</MenuItem>
                    <MenuItem icon={<ListAltIcon/>} onClick={() => navigate('/user/orders')}>My orders</MenuItem>
                </>}
                {isAuth && isMaster && <>
                    <MenuItem icon={<ListAltIcon/>} onClick={() => navigate('/master/orders')}>Orders to do</MenuItem>
                </>}
                {isAdmin && <SubMenu title="Tables" icon={<BackupTableIcon/>}>
                    <MenuItem onClick={() => navigate('/admin/orders')}>Orders</MenuItem>
                    <MenuItem onClick={() => navigate('/admin/users')}>Users</MenuItem>
                    <MenuItem onClick={() => navigate('/admin/masters')}>Masters</MenuItem>
                    <MenuItem onClick={() => navigate('/admin/cities')}>Cities</MenuItem>
                </SubMenu>}
                {isAuth &&
                <LogoutAlertDialog
                    OpenButtonType={(params) =>
                        <MenuItem {...params} icon={<LogoutIcon/>}/>
                    }
                    openButtonText='Log out'
                />}
            </Menu>
        </ProSidebar>
    )
}

export default Sidebar;