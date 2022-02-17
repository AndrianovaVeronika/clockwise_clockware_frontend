import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {isAuthUserSelector, isUserLoadingSelector} from "../store/selectors/authSelector";
import {useEffect} from "react";

const withRedirectAfterLogout = (Component) => (props) => {
    const navigate = useNavigate();
    const isAuth = useSelector(isAuthUserSelector);
    const userLoading = useSelector(isUserLoadingSelector);

    useEffect(() => {
        if (!isAuth && !userLoading){
            navigate('/login');
        }
    }, [isAuth, userLoading]);

    return <Component {...props}/>
}

export default withRedirectAfterLogout;