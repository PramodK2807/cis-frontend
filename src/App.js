import { Route, Routes } from "react-router-dom"
import './App.css';
import Homepage from './Pages/Homepage'
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Update from "./Pages/Update";
import PrivateRoute from './Components/PrivateRoute.jsx'
import Navbar from './Components/Navbar.jsx'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />

          <Route exact path='/profile' element={<PrivateRoute />}>
            <Route exact path='update/:id' element={<Update/>} />
          </Route>
      </Routes>
    </>
  );
}

export default App;