import React from 'react';
import './App.css';
import { BrowserRouter, HashRouter, Route, Router, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home';
import Menus from './componets/Menus';
import Cuentas from './pages/Cuentas/Cuentas';
import NuevaCuenta from './pages/Cuentas/NuevaCuenta';
import Transacciones from './pages/Transacciones/Transacciones';
import NuevaTransaccion from './pages/Transacciones/TransaccionNueva';



function App() {
  return (
    <div className="App">
      <HashRouter>
      <Menus/>
      <div className='container'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/Cuentas' element={<Cuentas />}  />
            <Route path='/NuevaCuenta' element={<NuevaCuenta />}  />
            <Route path='/Transacciones' element={<Transacciones />}/>
            <Route path='/NuevaTransaccion' element={<NuevaTransaccion />}/>
            <Route path='*' element={<h1>404 Not Found..!</h1>}/>
          </Routes>
        </div>
      </HashRouter>

    </div>
  );
}

export default App;
