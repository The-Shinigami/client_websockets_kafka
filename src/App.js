import './App.css';

import ResponsiveAppBar from "./component/ResponsiveAppBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckYourResult from "./component/CheckYourResult";
import Diabetesdata from "./component/Diabetesdata";
import Statistics from "./component/Statistics";

function App() {

  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="" element={<><ResponsiveAppBar/></>}></Route>
                <Route path="checkyourresult" element={<><ResponsiveAppBar/><CheckYourResult /></>}></Route>
                <Route path="diabetesdata" element={<><ResponsiveAppBar/><Diabetesdata /></>}></Route>
                <Route path="statistics" element={<><ResponsiveAppBar/><Statistics /></>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
