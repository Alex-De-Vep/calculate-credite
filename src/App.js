import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";

function App() {
    return (
        <div className="App">
            <Header/>

            <Routes>

                <Route path="/" element={<Main/>}/>

                {/*<Route path="*" element={<NotFound/>} />*/}

            </Routes>

            <Footer/>
        </div>
    );
}

export default App;
