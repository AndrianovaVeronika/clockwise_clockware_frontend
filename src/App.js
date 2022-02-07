import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./store/store";
import HomePage from "./components/Pages/HomePage";
import AdminPage from './components/Pages/AdminPage';
import AdminOrdersPage from './components/Pages/AdminOrdersPage';
import AdminMastersPage from "./components/Pages/AdminMastersPage";
import AdminCitiesPage from "./components/Pages/AdminCitiesPage";


function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path='/admin' element={<AdminPage/>}/>
                <Route path='/admin/orders' element={<AdminOrdersPage/>}/>
                <Route path='/admin/masters' element={<AdminMastersPage/>}/>
                <Route path='/admin/cities' element={<AdminCitiesPage/>}/>
            </Routes>
        </Provider>
    );
}

export default App;
