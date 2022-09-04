import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Route, Routes} from 'react-router-dom';
import {verifyUserAccess} from "./store/actions/auth";
import SignInPage from "./components/Pages/AuthPages/SignInPage";
import SignUpPage from "./components/Pages/AuthPages/SignUpPage";
import Spinner from "./components/PageComponents/Spinner";
import LogoutAlertDialog from "./components/Dialogs/LogoutAlertDialog";
import OrderSuccessAlertDialog from "./components/Dialogs/OrderSuccessAlertDialog";
import UserCreatedDialog from "./components/Dialogs/UserCreatedDialog";

const HomePage = React.lazy(() => import("./components/Pages/HomePage"));
const ProfilePage = React.lazy(() => import("./components/Pages/UserPages/ProfilePage"));
const AdminOrdersPage = React.lazy(() => import("./components/Pages/AdminPages/AdminOrdersPage"));
const AdminMastersPage = React.lazy(() => import("./components/Pages/AdminPages/AdminMastersPage"));
const AdminCitiesPage = React.lazy(() => import("./components/Pages/AdminPages/AdminCitiesPage"));
const AdminUsersPage = React.lazy(() => import("./components/Pages/AdminPages/AdminUsersPage"));
const ErrorAccessAdminDeniedPage = React.lazy(() => import("./components/Pages/ErrorPages/ErrorAccessAdminDeniedPage"));
const EmailVerificationStatePage = React.lazy(()=> import("./components/Pages/AuthPages/EmailVerificationStatePage"));
const UserOrdersPage = React.lazy(()=>import("./components/Pages/UserPages/UserOrdersPage"));
const MasterOrdersPage = React.lazy(()=>import("./components/Pages/MasterPages/MasterOrdersPage"));

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(verifyUserAccess());
    }, [dispatch]);

    return (
        <>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path='/login' element={<SignInPage/>}/>
                <Route path='/spinner' element={<Spinner/>}/>
                <Route path='/signup' element={<SignUpPage/>}/>
                <Route path='/verify/email/:code' element={<EmailVerificationStatePage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/logout' element={<LogoutAlertDialog/>}/>
                <Route path='/order/success' element={<OrderSuccessAlertDialog/>}/>
                <Route path='/user/success' element={<UserCreatedDialog/>}/>
                <Route path='/admin/orders' element={<AdminOrdersPage/>}/>
                <Route path='/admin/users' element={<AdminUsersPage/>}/>
                <Route path='/admin/masters' element={<AdminMastersPage/>}/>
                <Route path='/admin/cities' element={<AdminCitiesPage/>}/>
                <Route path='/admin/error' element={<ErrorAccessAdminDeniedPage/>}/>
                <Route path='/user/orders' element={<UserOrdersPage/>}/>
                <Route path='/master/orders' element={<MasterOrdersPage/>}/>
            </Routes>
        </>
    );
}

export default App;
