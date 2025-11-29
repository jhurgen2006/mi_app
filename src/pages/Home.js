import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

import Carousel from "../components/Carousel";
import AboutUs from "../components/AboutUs";

function Home() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  const displayed = products.filter((p) => {
    if (filter === "all") return true;
    if (filter === "gorras") {
      if (p.category) return p.category === "gorras";
      return p.name.toLowerCase().includes("gorra");
    }
    return true;
  });

  const buttonStyle = {
    padding: "12px 24px",
    marginRight: "12px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "2px solid #ffffff",
    background: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    transition: "all 0.3s ease",
  };
  const activeStyle = {
    background: "#ffffff",
    color: "#000000",
    borderColor: "#ffffff",
  };

  return (
    <div>
        <Carousel products={products} />

        <AboutUs />

        <h1 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "30px", marginTop: 0, color: "#ffffff" }}>Productos</h1>

      <div style={{ marginBottom: 30 }}>
        <button
          onClick={() => setFilter("gorras")}
          style={{ ...buttonStyle, ...(filter === "gorras" ? activeStyle : {}) }}
        >
          Gorras
        </button>
      </div>

      {displayed.length === 0 ? (
        products.length === 0 ? (
          <p>Cargando productos...</p>
        ) : (
          <p>No hay productos que coincidan con el filtro.</p>
        )
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "30px" }}>
          {displayed.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
