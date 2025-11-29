import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import PaymentModal from "./PaymentModal";

const CartModal = ({ onClose }) => {
  const { items, changeQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>Tu Carrito</h3>
          <button onClick={onClose} style={styles.close}>✕</button>
        </div>

        <div style={styles.content}>
          {items.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <div>
              {items.map((it) => (
                <div key={it.product.id} style={styles.row}>
                  <img src={it.product.image} alt={it.product.name} style={styles.thumb} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{it.product.name}</div>
                    <div style={{ color: "#666" }}>${it.product.price.toLocaleString()}</div>
                    <div style={{ marginTop: 8 }}>
                      <button onClick={() => changeQuantity(it.product.id, -1)} style={styles.qtyBtn}>-</button>
                      <span style={{ margin: "0 8px" }}>{it.quantity}</span>
                      <button onClick={() => changeQuantity(it.product.id, +1)} style={styles.qtyBtn}>+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(it.product.id)} style={styles.remove}>Eliminar</button>
                </div>
              ))}

              <div style={styles.footer}>
                <div style={{ fontWeight: 700 }}>Total: ${totalPrice.toLocaleString()}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={clearCart} style={styles.clear}>Vaciar</button>
                  <button onClick={() => setShowPayment(true)} style={styles.checkout}>Proceder al pago</button>
                </div>
              </div>
            </div>
          )}
        </div>
        {showPayment && (
          <PaymentModal
            cartItems={items}
            total={totalPrice}
            onClose={() => setShowPayment(false)}
            onSuccess={() => {
              setShowPayment(false);
              onClose();
            }}
          />
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1100,
  },
  modal: {
    width: "90%",
    maxWidth: 700,
    background: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
  },
  close: {
    background: "none",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
  },
  content: {
    padding: 16,
  },
  row: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #f2f2f2",
  },
  thumb: {
    width: 80,
    height: 60,
    objectFit: "cover",
    borderRadius: 6,
  },
  qtyBtn: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #ddd",
    background: "#f7f7f7",
    cursor: "pointer",
  },
  remove: {
    background: "none",
    border: "none",
    color: "#d00",
    cursor: "pointer",
  },
  footer: {
    marginTop: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clear: {
    background: "#eee",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  checkout: {
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default CartModal;
