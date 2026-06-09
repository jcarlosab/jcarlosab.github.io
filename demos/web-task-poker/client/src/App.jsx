// app/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoomProvider, useRoom } from './context/RoomContext';
import Home from './pages/Home';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardUser from './pages/DashboardUser';
import LoginForm from './components/LoginForm';

function RoomRouteWrapper() {
  const { currentUser } = useRoom();
  // Si no hay usuario, muestra el login
  if (!currentUser?.username) {
    return <LoginForm />;
  }
  // Si es master, dashboard admin; si es participant, dashboard vote
  if (currentUser.role === 'master') {
    return <DashboardAdmin />;
  }
  if (currentUser.role === 'participant') {
    return <DashboardUser />;
  }
  // fallback
  return <LoginForm />;
}

function App() {
  return (
    <RoomProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/login/:uuid" element={<LoginForm />} />
          <Route path="/room/:uuid/*" element={<RoomRouteWrapper />} />
        </Routes>
      </Router>
    </RoomProvider>
  );
}

export default App;