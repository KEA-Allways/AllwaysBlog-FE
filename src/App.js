import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import MainPage from "./pages/MainPage";
import BlogPage from "./pages/BlogPage";
import ManagePage from "./pages/ManagePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {

  // const marginStyle = {
  //   marginLeft: '3rem',
  //   marginRight: '3rem',
  // }
    
  return (
    
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/mngt" element={<ManagePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
