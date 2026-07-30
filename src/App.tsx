import { Routes, Route } from 'react-router'
import Landing from './pages/Landing'
import StudentApp from './pages/StudentApp'
import TeacherApp from './pages/TeacherApp'
import AdvisorApp from './pages/AdvisorApp'
import AdminApp from './pages/AdminApp'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/student" element={<StudentApp />} />
      <Route path="/teacher" element={<TeacherApp />} />
      <Route path="/advisor" element={<AdvisorApp />} />
      <Route path="/admin" element={<AdminApp />} />
    </Routes>
  )
}
