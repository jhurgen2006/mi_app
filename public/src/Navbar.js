import React from "react";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Mi Tienda</h2>
      <ul style={styles.menu}>
        <li>Inicio</li>
        <li>Productos</li>
        <li>Carrito</li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    background: "#222",
    color: "white",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { margin: 0 },
  menu: {
    display: "flex",
    listStyle: "none",
    gap: "20px",
    margin: 0,
  },
};

export default Navbar;
