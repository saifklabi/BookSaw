
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Register from './pages/Register';
import Layout from './pages/Dashboard/Layout';
import GestionCategory from './pages/Dashboard/admin/GestionCategory';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
  <>
<BrowserRouter>
<ToastContainer position='top-right' autoClose={4000}/>

<Routes>

  
  <Route path='/' element={<Home/>}/>
  <Route path='/login' element= { <Signin/>} />
   <Route path='/register' element= { <Register/>} />
   <Route path ='/dashboard' element= { <Layout/>} >
  <Route path='category' element={<GestionCategory/>}/> 
   </Route>

</Routes>

</BrowserRouter>


  </>
  );
}

export default App;
