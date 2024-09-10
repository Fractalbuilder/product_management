import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Header from './components/Header'
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <div className="App">
      <Router>
          <AuthProvider>
            <Header/>
              <Routes className="bg-blue">
                <Route element={<PrivateRoutes />}>
                  <Route path="/" element={<ProductsPage />} exact />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
          </AuthProvider>
      </Router>
    </div>
  );
}

export default App;