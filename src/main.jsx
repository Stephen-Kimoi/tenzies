import { Route, BrowserRouter, Routes } from 'react-router-dom'; 
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Instructions from './Instructions';
import Start from './Start';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes> 
        <Route path={"/"} element={<Start />} /> 
        <Route path={"/game"} element={<App />} /> 
        <Route path={"/instructions"} element={<Instructions />} />  
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
