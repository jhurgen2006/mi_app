import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <div style={{ minHeight: "100vh", background: "#000000" }}>
        <Navbar />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
          <Home />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
