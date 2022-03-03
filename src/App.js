import * as React from 'react';
import {useEffect} from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {verifyUserAccess} from "./store/actions/auth";
import ErrorNotAdminPage from "./components/Pages/ErrorPages/ErrorAccessAdminDeniedPage";
import SignInPage from "./components/Pages/AuthPages/SignInPage";
import SignUpPage from "./components/Pages/AuthPages/SignUpPage";
import Spinner from "./components/PageComponents/Spinner";

const HomePage = React.lazy(() => import("./components/Pages/HomePage"));
const ProfilePage = React.lazy(() => import("./components/Pages/UserPages/ProfilePage"));
const AdminOrdersPage = React.lazy(() => import("./components/Pages/AdminPages/AdminOrdersPage"));
const AdminMastersPage = React.lazy(() => import("./components/Pages/AdminPages/AdminMastersPage"));
const AdminCitiesPage = React.lazy(() => import("./components/Pages/AdminPages/AdminCitiesPage"));
const AdminUsersPage = React.lazy(() => import("./components/Pages/AdminPages/AdminUsersPage"));
const AddOrderPage = React.lazy(() => import("./components/Pages/UserPages/AddOrderPage"));

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
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/add/order' element={<AddOrderPage/>}/>
                <Route path='/admin/orders' element={<AdminOrdersPage/>}/>
                <Route path='/admin/users' element={<AdminUsersPage/>}/>
                <Route path='/admin/masters' element={<AdminMastersPage/>}/>
                <Route path='/admin/cities' element={<AdminCitiesPage/>}/>
                <Route path='/admin/error' element={<ErrorNotAdminPage/>}/>
            </Routes>
        </>
    );
}

export default App;
