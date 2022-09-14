import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {isMasterSelector, isUserLoadingSelector} from "../store/selectors/authSelector";

const withRedirectIfNotMaster = (Component) => (props) => {
    const isMasterAccount = useSelector(isMasterSelector);
    const userLoading = useSelector(isUserLoadingSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isMasterAccount && !userLoading) {
            navigate('/admin/error');
        }
    }, [isMasterAccount]);

    return <Component {...props}/>
}

export default withRedirectIfNotMaster;