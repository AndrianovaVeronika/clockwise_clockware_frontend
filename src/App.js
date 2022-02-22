import './App.css';
import {Route, Routes} from 'react-router-dom';
import HomePage from "./components/Pages/HomePage";
import ProfilePage from "./components/Pages/UserPages/ProfilePage";
import AdminOrdersPage from "./components/Pages/AdminPages/AdminOrdersPage";
import AdminMastersPage from "./components/Pages/AdminPages/AdminMastersPage";
import AdminCitiesPage from "./components/Pages/AdminPages/AdminCitiesPage";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {verifyUserAccess} from "./store/actions";
import AdminUsersPage from "./components/Pages/AdminPages/AdminUsersPage";
import ErrorNotAdminPage from "./components/Pages/ErrorPages/ErrorAccessAdminDeniedPage";
import SignInPage from "./components/Pages/AuthPages/SignInPage";
import SignUpPage from "./components/Pages/AuthPages/SignUpPage";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(verifyUserAccess());
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path='/login' element={<SignInPage/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/admin/orders' element={<AdminOrdersPage/>}/>
            <Route path='/admin/users' element={<AdminUsersPage/>}/>
            <Route path='/admin/masters' element={<AdminMastersPage/>}/>
            <Route path='/admin/cities' element={<AdminCitiesPage/>}/>
            <Route path='/admin/error' element={<ErrorNotAdminPage/>}/>
        </Routes>
    );
}

export default App;
