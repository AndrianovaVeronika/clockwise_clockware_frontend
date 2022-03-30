import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {isAuthUserSelector, isUserLoadingSelector} from "../store/selectors/authSelector";
import {useEffect} from "react";

const withRedirectAfterLogout = (Component) => (props) => {
    const isAuth = useSelector(isAuthUserSelector);
    const userLoading = useSelector(isUserLoadingSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth && !userLoading){
            console.log('navigated')
            navigate('/login');
        }
    }, [isAuth, userLoading]);

    return <Component {...props}/>
}

export default withRedirectAfterLogout;