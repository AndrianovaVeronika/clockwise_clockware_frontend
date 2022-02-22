import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {getCurrentUserSelector} from "../store/selectors/authSelector";

const withRedirectIfNotAdmin = (Component) => (props) => {
    const user = useSelector(getCurrentUserSelector);
    const navigate = useNavigate();

    console.log(user);

    useEffect(() => {
        if (!user.roles || !user.roles.include('ROLE_ADMIN')){
            console.log('REDIRECTING')
            navigate('/admin/error');
        }
    }, [user]);

    return <Component {...props}/>
}

export default withRedirectIfNotAdmin;