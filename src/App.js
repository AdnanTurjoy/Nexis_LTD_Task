import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Attendance from "./pages/attendance/Attendance";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { createContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./route/PrivateRoute";
export const TokenAuth = createContext();
function App() {
  const [token, setToken] = useState({});
  console.log(token);
  return (
    <div className="App">
      <TokenAuth.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Routes>
          <Route
              path="/"
              element={
                <PrivateRoute token={token}>
                  <Attendance />
                </PrivateRoute>
              }
            />
            {/* <Route path="/" element={<Attendance />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </TokenAuth.Provider>
    </div>
  );
}

export default App;
