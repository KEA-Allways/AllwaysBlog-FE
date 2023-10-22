import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import MainPage from "./pages/MainPage/MainPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import ManagePage from "./pages/ManagePage/ManagePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage.js/SignUpPage";
import PostPage from "./pages/PostPage/PostPage";
import BlogCreationPage from "./pages/BlogPage/BlogCreationPage";
import MngtTheme from "./pages/MngtTheme/MngtTheme";
import MngtList from "./pages/MngtList/MngtList";
import MngtContent from "./pages/MngtContent/MngtContent"
import MngtTemplate from "./pages/MngtTemplate/MngtTemplate";
import { ThemeProvider, createTheme } from "@mui/material";
import DetailPage from "./pages/DetailPage/DetailPage";

const theme = createTheme({
  typography : {
    fontFamily : "Yeongdeok Blueroad"
  }
})

function App() {

  // const marginStyle = {
  //   marginLeft: '3rem',
  //   marginRight: '3rem',
  // }
    
  return (
    
    <ThemeProvider theme={theme}>
      
      <div className={styles.App}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blogs/themes/:themeId" element={<BlogPage />} />
            <Route path="/blogs/themes/:themeId/lists/:listId" element={<BlogPage />} />
            <Route path="/blog-creation" element={<BlogCreationPage/>} />
            <Route path="/mngt" element={<ManagePage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/mngt/theme" element={<MngtTheme />} />
            <Route path="/mngt/theme/:themeSeq" element={<MngtList />} />
            <Route path="/mngt/content" element={<MngtContent/>} />
            <Route path="/mngt/template" element={<MngtTemplate/>}/>
            <Route path="/post/:title" element={<DetailPage/>} />
          </Routes>
        </BrowserRouter>
      </div>

    </ThemeProvider>
  );
}

export default App;
