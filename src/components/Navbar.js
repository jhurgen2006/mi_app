import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";

const Navbar = () => {
  const { totalCount } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>JH CAPS Urbans</h2>
      <ul style={styles.menu}>
        <li>Inicio</li>
        <li>Productos</li>
        <li>
          <button onClick={() => setShowCart(true)} style={styles.cartBtn}>
            🛒 {totalCount}
          </button>
        </li>
      </ul>
      {showCart && <CartModal onClose={() => setShowCart(false)} />}
    </nav>
  );
};

const styles = {
  nav: {
    background: "#1a1a1a",
    color: "white",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e0e0e0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  },
  logo: { 
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase"
  },
  menu: {
    display: "flex",
    listStyle: "none",
    gap: "30px",
    margin: 0,
    padding: 0,
  },
  cartBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#ffffff",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default Navbar;
