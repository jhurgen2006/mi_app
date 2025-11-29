import React, { useState } from "react";
import PaymentModal from "./PaymentModal";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";

const ProductCard = ({ product }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { addToCart } = useCart();
  const [showCartModal, setShowCartModal] = useState(false);

  return (
    <>
      <div style={styles.card}>
        <img src={product.image} alt={product.name} style={styles.img} />
        <div style={{ padding: "16px" }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "600", color: "#ffffff" }}>{product.name}</h3>
          <p style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "700", color: "#ffffff" }}>
            ${product.price.toLocaleString()}
          </p>
          <button
            onClick={() => {
              // Mantener la sombra verde visible brevemente y abrir pago
              setIsPressed(true);
              setShowPayment(true);
              setTimeout(() => setIsPressed(false), 350);
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseLeave={() => setIsPressed(false)}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                setIsPressed(true);
              }
            }}
            style={{ ...styles.button, ...(isPressed ? styles.buttonPressed : {}) }}
          >
            Comprar
          </button>

          <button
            onClick={() => {
              addToCart(product);
              // mostrar modal de carrito brevemente
              setShowCartModal(true);
              setTimeout(() => setShowCartModal(false), 900);
            }}
            style={{ ...styles.cartButton }}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
      {showPayment && <PaymentModal product={product} onClose={() => setShowPayment(false)} />}
      {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
    </>
  );
};

const styles = {
  card: {
    padding: "0",
    border: "1px solid #333333",
    borderRadius: "8px",
    textAlign: "left",
    backgroundColor: "#1a1a1a",
    boxShadow: "0 4px 12px rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  img: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "0",
  },
  button: {
    marginTop: "0",
    padding: "14px 16px",
    width: "100%",
    backgroundColor: "#ffffff",
    color: "#000000",
    borderRadius: "0",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    transition: "background-color 0.3s ease",
  },
  buttonPressed: {
    boxShadow: "0 8px 24px rgba(34,197,94,0.45)",
    transform: "translateY(-2px)",
  },
  cartButton: {
    marginTop: 8,
    padding: "10px 12px",
    width: "100%",
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default ProductCard;
