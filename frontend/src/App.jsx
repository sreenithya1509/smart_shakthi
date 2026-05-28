import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Assistant } from './pages/Assistant.jsx';
import { EmergencyContacts } from './pages/EmergencyContacts.jsx';
import { Landing } from './pages/Landing.jsx';
import { LiveMap } from './pages/LiveMap.jsx';
import { Login } from './pages/Login.jsx';
import { Profile } from './pages/Profile.jsx';
import { Signup } from './pages/Signup.jsx';
import { SOS } from './pages/SOS.jsx';
import { Settings } from './pages/Settings.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/contacts" element={<EmergencyContacts />} />
          <Route path="/map" element={<LiveMap />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}
