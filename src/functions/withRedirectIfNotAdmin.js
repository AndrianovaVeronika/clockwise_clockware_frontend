import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {isAdminSelector} from "../store/selectors/authSelector";

const withRedirectIfNotAdmin = (Component) => (props) => {
    const isAdmin = useSelector(isAdminSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin){
            navigate('/admin/error');
        }
    }, [isAdmin]);

    return <Component {...props}/>
}

export default withRedirectIfNotAdmin;