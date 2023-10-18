import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import MainPage from "./pages/MainPage/MainPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import ManagePage from "./pages/ManagePage/ManagePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage.js/SignUpPage";
import PostPage from "./pages/PostPage/PostPage";
import MngtTheme from "./pages/MngtTheme/MngtTheme";
import MngtList from "./pages/MngtList/MngtList";
import MngtContent from "./pages/MngtContent/MngtContent"
import MngtTemplate from "./pages/MngtTemplate/MngtTemplate";


function App() {

  // const marginStyle = {
  //   marginLeft: '3rem',
  //   marginRight: '3rem',
  // }
    
  return (
    
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/mngt" element={<ManagePage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/mngt/theme" element={<MngtTheme />} />
          <Route path="/mngt/theme/:themeSeq" element={<MngtList />} />
          <Route path="/mngt/content" element={<MngtContent/>} />
          <Route path="/mngt/template" element={<MngtTemplate/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
