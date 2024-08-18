import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import "./App.css";

const Home = lazy(() => import("./components/Home"));
const Desktop = lazy(() => import("./components/Desktop"));
const Blockchain = lazy(() => import("./components/Blockchain"));

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/desktop" element={<Desktop />} />
          <Route path="/blockchain" element={<Blockchain />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
