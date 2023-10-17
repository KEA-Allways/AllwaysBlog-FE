import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import MainPage from "./pages/MainPage";
import BlogPage from "./pages/BlogPage";
import ManagePage from "./pages/ManagePage";
import LoginPage from "./pages/LoginPage";
import MngtCats from "./pages/MngtCats";
import MngtLists from "./pages/MngtLists";

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
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/mngt" element={<ManagePage />} />
          <Route path="/mngtCats" element={<MngtCats />} />
          <Route path="/cat/:themeSeq" element={<MngtLists />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
