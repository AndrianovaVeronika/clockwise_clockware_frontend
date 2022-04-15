import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {isAdminSelector, isUserLoadingSelector} from "../store/selectors/authSelector";

const withRedirectIfNotAdmin = (Component) => (props) => {
    const isAdmin = useSelector(isAdminSelector);
    const userLoading = useSelector(isUserLoadingSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin && !userLoading){
            console.log('admin? ' + isAdmin + ' loading? ' + userLoading)
            navigate('/admin/error');
        }
    }, [isAdmin]);

    return <Component {...props}/>
}

export default withRedirectIfNotAdmin;