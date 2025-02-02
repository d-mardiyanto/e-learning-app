import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import AdminPanel from "./pages/admin-panel/Main";
// import ProtectedRoute from "./middleware/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin-panel"
            element={
              <AdminPanel />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
