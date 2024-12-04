import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import AddEditEmployee from './components/AddEditEmployee';

function App() {
    return (
        <Router>
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add" element={<AddEditEmployee />} />
                <Route path="/edit/:id" element={<AddEditEmployee />} />
            </Routes>
        </Router>
    );
}

export default App;
