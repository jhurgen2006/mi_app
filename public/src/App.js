import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
