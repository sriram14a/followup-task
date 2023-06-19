import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
// import { Details } from "./getdetails";
import { Display } from "./display";

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Display/>}/>
      </Routes>
    </div>
  );
}

export default App;
