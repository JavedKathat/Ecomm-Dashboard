import {BrowserRouter,Routes, Route} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />} >
            <Route path="/" element={<h1>Products</h1>} />
            <Route path="/update" element={<h1>Update Product</h1>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/about" element={<h1>About Products</h1>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/logout" element={<Login/>} />
          </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login/>} />
        </Routes>
        <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
