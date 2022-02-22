import './App.css';
import {Route, Routes} from 'react-router-dom';
import HomePage from "./components/Pages/HomePage";
import SignInFormDialog from "./components/Auth/SignInFormDialog";
import ProfilePage from "./components/Pages/ProfilePage";
import AdminOrdersPage from "./components/Pages/AdminOrdersPage";
import AdminMastersPage from "./components/Pages/AdminMastersPage";
import AdminCitiesPage from "./components/Pages/AdminCitiesPage";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {verifyUserAccess} from "./store/actions";
import SignUpFormDialog from "./components/Auth/SignUpFormDialog";
import AdminUsersPage from "./components/Pages/AdminUsersPage";
import ErrorNotAdminPage from "./components/Pages/ErrorNotAdminPage";

function App() {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (sessionStorage.getItem('TOKEN')) {
    //         dispatch(verifyUserAccess());
    //     }
    // }, [dispatch]);

    return (
        <div className='page'>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path='/login' element={<SignInFormDialog/>}/>
                <Route path='/signup' element={<SignUpFormDialog/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/admin/orders' element={<AdminOrdersPage/>}/>
                <Route path='/admin/users' element={<AdminUsersPage/>}/>
                <Route path='/admin/masters' element={<AdminMastersPage/>}/>
                <Route path='/admin/cities' element={<AdminCitiesPage/>}/>
                <Route path='/admin/error' element={<ErrorNotAdminPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
