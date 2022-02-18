import './App.css';
import {Route, Routes} from 'react-router-dom';
import HomePage from "./components/Pages/HomePage";
import AdminPage from "./components/Pages/AdminPage";
import AuthenticationFormDialog from "./components/Auth/SignInFormDialog";
import ProfilePage from "./components/Pages/ProfilePage";
import AdminOrdersPage from "./components/Pages/AdminOrdersPage";
import AdminMastersPage from "./components/Pages/AdminMastersPage";
import AdminCitiesPage from "./components/Pages/AdminCitiesPage";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {verifyUserAccess} from "./store/actions";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(verifyUserAccess());
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path='/login' element={<AuthenticationFormDialog/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/admin' element={<AdminPage/>}/>
            <Route path='/admin/orders' element={<AdminOrdersPage/>}/>
            <Route path='/admin/masters' element={<AdminMastersPage/>}/>
            <Route path='/admin/cities' element={<AdminCitiesPage/>}/>
        </Routes>
    );
}

export default App;
