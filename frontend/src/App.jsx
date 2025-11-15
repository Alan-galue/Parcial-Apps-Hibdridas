import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import BackgroundWrapper from './components/BackgroundWrapper';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Personajes from './components/Personajes';
import Planetas from './components/Planetas';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BackgroundWrapper>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/personajes" 
              element={
                <ProtectedRoute>
                  <Personajes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/planetas" 
              element={
                <ProtectedRoute>
                  <Planetas />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/personajes" replace />} />
            </Routes>
          </div>
        </Router>
      </BackgroundWrapper>
    </AuthProvider>
  );
}

export default App;
