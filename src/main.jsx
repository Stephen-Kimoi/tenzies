import { Route, BrowserRouter, Routes } from 'react-router-dom'; 
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Instructions from './components/Instructions';
import Start from './components/Start';


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
