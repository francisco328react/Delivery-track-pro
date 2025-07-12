import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from "./pages/Login";
import { useAuth } from './context/useAuth';

type Props = {
  children: React.ReactNode;
};

export function App() {

  function Dashboard() {
    return <h1 className='text-center mt-20 text-2xl font-bold'>Dashboard</h1>
  }

  function PrivateRoute({ children }: Props) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route 
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes> 
    </BrowserRouter>
  )
}

