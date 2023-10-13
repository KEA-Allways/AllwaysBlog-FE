import { BrowserRouter, Routes, Route } from "react-router-dom";
// or less ideally
import { Button } from 'react-bootstrap';
import Topbar from "./components/Topbar";

function App() {
  return (
    <div>
      <Topbar />
    </div>
  );
}

export default App;
