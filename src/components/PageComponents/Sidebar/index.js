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
import {useTranslation} from "react-i18next";

const Sidebar = () => {
    const {t} = useTranslation();
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
                    <MenuItem
                        icon={<AccountBoxIcon/>}
                        onClick={() => navigate('/profile')}
                    >{t("sidebar.profile")}</MenuItem>
                    <MenuItem
                        icon={<ListAltIcon/>}
                        onClick={() => navigate('/user/orders')}
                    >{t("sidebar.userOrders")}</MenuItem>
                </>}
                {isAuth && isMaster && <>
                    <MenuItem
                        icon={<ListAltIcon/>}
                        onClick={() => navigate('/master/orders')}
                    >{t("sidebar.masterOrders")}</MenuItem>
                </>}
                {isAdmin && <SubMenu title={t("sidebar.tables.title")} icon={<BackupTableIcon/>}>
                    <MenuItem onClick={() => navigate('/admin/orders')}>{t("sidebar.tables.orders")}</MenuItem>
                    <MenuItem onClick={() => navigate('/admin/users')}>{t("sidebar.tables.users")}</MenuItem>
                    <MenuItem onClick={() => navigate('/admin/masters')}>{t("sidebar.tables.masters")}</MenuItem>
                    <MenuItem onClick={() => navigate('/admin/cities')}>{t("sidebar.tables.cities")}</MenuItem>
                </SubMenu>}
                {isAuth &&
                <LogoutAlertDialog
                    OpenButtonType={(params) =>
                        <MenuItem {...params} icon={<LogoutIcon/>}/>
                    }
                    openButtonText={t("sidebar.logout")}
                />}
            </Menu>
        </ProSidebar>
    )
}

export default Sidebar;