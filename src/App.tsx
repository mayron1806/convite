import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "./Hooks/useAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageProtector from "./pages/PageProtector";
function App() {
  const { fetchingUser } = useAuth();
  return (
    <div style={{height: `${window.innerHeight}px`}}>
      {
        !fetchingUser &&
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<PageProtector require_auth={false}><Login /></PageProtector>}/>
            <Route path="/" element={<PageProtector><Home /></PageProtector>}/>
          </Routes>
        </BrowserRouter>
        ||
        <p>Carregando...</p>
      }
    </div>
  );
}

export default App
