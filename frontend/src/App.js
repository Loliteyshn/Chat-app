import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Register/Login';
import ChatContainer from './components/ChatContainer';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ChatContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
