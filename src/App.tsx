import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "./Hooks/useAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageProtector from "./pages/PageProtector";
import Party from "./pages/Party";
import Loading from "./UI/Loading";
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
            <Route path="/party/:name" element={<PageProtector><Party /></PageProtector>}/>
          </Routes>
        </BrowserRouter>
        ||
        <div style={{width: '100%', height: '100%', background: 'var(--black)'}}>
          <Loading text="Carregando..."/>
        </div>
      }
    </div>
  );
}

export default App
