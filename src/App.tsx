import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";

import AdminPanel from "./pages/admin-panel/Main";
import Dashboard from "./pages/admin-panel/Dashboard";
import InstructorsPage from "./pages/admin-panel/Instructors";
import ProgramStudy from "./pages/admin-panel/ProgramStudy";
import Schedule from "./pages/admin-panel/Schedule";
import StudentsPage from "./pages/admin-panel/Students";
import ClassPage from "./pages/admin-panel/Classes";
import Courses from "./pages/admin-panel/Courses";
import ProtectedRoute from "./middleware/ProtectedRoute";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-panel" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="classes" element={<ClassPage />} />
            <Route path="program_study" element={<ProgramStudy />} />
            <Route path="courses" element={<Courses />} />
            <Route path="instructors" element={<InstructorsPage />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="students" element={<StudentsPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
