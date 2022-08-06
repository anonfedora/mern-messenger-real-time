import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import Messenger from "./components/Messenger";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/messenger/login" element={ <Login/>}/>
          <Route path="/messenger/register" element={ <Register/>}/>
          
          <Route path="/" element={<ProtectedRoute> <Messenger/></ProtectedRoute>}/>
                  </Routes>
      </Router>
    </div>
  );
}

export default App;
