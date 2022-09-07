import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageProtector from "./pages/PageProtector";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<PageProtector><Home /></PageProtector>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
