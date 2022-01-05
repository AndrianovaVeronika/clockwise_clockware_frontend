import './App.css';
import {Routes, Route} from 'react-router-dom';
import HomePage from "./components/Pages/HomePage";
import AdminPage from './components/Pages/AdminPage';
import AdminOrdersPage from './components/Pages/AdminOrdersPage';

function App() {
    return (
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path='/admin' element={<AdminPage/>}/>
            <Route path='/admin/orders' element={<AdminOrdersPage/>}/>
        </Routes>
    );
}

export default App;
