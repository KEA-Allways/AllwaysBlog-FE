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
import {loginStore} from "./store/store";
import TemplatePage from "./pages/TemplatePage/TemplatePage";

import { ApmRoutes } from '@elastic/apm-rum-react'
import { init as initApm } from '@elastic/apm-rum'

const apm = initApm({
  serviceName: 'Allways-FE',
  serverUrl: process.env.REACT_APP_APM_URL,
  secretToken: process.env.REACT_APP_APM_TOKEN,
  environment: "msa-allways"
});



const theme = createTheme({
  typography : {
    fontFamily : "Yeongdeok Blueroad"
  }
})

function App() {
  
  return (
    
    <ThemeProvider theme={theme}>
      
      <div className={styles.App}>
        <BrowserRouter>
        <ApmRoutes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/blog/:userSeq" element={<BlogPage/>} />
            <Route path="/blog/:userSeq/theme/:themeSeq" element={<BlogPage />} />
            <Route path="/blog/:userSeq/theme/:themeSeq/category/:categorySeq" element={<BlogPage />} />
            <Route path="/blog-creation" element={<BlogCreationPage />} />
            <Route path="/mngt" element={<ManagePage />} />
            <Route path="/post/edit/:themeSeq" element={<PostPage />} />
            <Route path="/template/edit" element={<TemplatePage/>}/>
            <Route path="/template/edit/:templateSeq" element={<TemplatePage/>}/>
            <Route path="/mngt/theme" element={<MngtTheme />} />
            <Route path="/mngt/theme/:themeSeq" element={<MngtList />} />
            <Route path="/mngt/content" element={<MngtContent />} />
            <Route path="/mngt/template" element={<MngtTemplate />}/>
            <Route path="/post/:postSeq" element={<DetailPage />} />
            <Route path="/blog/:userSeq/post/:postSeq" element={<DetailPage />} />
            <Route path="/theme/:themeSeq/post/:postSeq" element={<DetailPage />} />
          </ApmRoutes>
        </BrowserRouter>
      </div>

    </ThemeProvider>
  );
}

export default App;
