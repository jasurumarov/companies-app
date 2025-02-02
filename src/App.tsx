import { Route, Routes } from "react-router-dom"

// Toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// Pages
import SignIn from "./pages/sign-in/SignIn"
import SignUp from "./pages/sign-up/SignUp"
import Auth from "./components/auth/Auth"
import Admin from "./pages/admin/Admin"

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/" element={<Auth />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
