
import './App.css';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Register from './pages/Register';
import Layout from './pages/Dashboard/Layout';
import Users from './pages/Dashboard/librarian/users';
import GestionCategory from './pages/Dashboard/admin/GestionCategory';
import { ToastContainer } from 'react-toastify';
import LayoutLibrarian from './pages/Dashboard/librarian/LayoutLibrarian';
import GestionBook from './pages/Dashboard/librarian/GestionBook';
import LayoutClient from './pages/LayoutClient';

function App() {
  return (
  <>
<BrowserRouter>
<ToastContainer position='top-right' autoClose={4000}/>

<Routes>

  
  <Route path='/' element={<Home/>}/>
  <Route path='/layout-client' element={<LayoutClient />} />
  <Route path='/login' element= { <Signin/>} />
   <Route path='/register' element= { <Register/>} />
  <Route path="/dashboard/librarian" element={<LayoutLibrarian />}>
    <Route path="books" element={<GestionBook />} />
    <Route path="users" element={<Users />} />
  </Route>
   <Route path ='/dashboard' element= { <Layout/>} >
  <Route path='category' element={<GestionCategory/>}/> 
   </Route>
   <Route path="/layoutlibrarian" element={<LayoutLibrarian />}>
   <Route path="gestionbook" element={<GestionBook />} />
    </Route>

</Routes>

</BrowserRouter>


  </>
  );
}

export default App;
