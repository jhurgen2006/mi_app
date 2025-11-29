import React, { useState } from "react";
import { useCart } from "../context/CartContext";

// Accept either a single `product` or `cartItems` array + `total` for cart checkout
const PaymentModal = ({ product, cartItems, total, onClose, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
    accountHolder: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { clearCart } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems && cartItems.length > 0) {
      alert(`Pago procesado. Total: $${total.toLocaleString()}`);
      // clear cart after payment
      try {
        clearCart();
      } catch (err) {}
      if (typeof onSuccess === "function") {
        onSuccess();
        return;
      }
    } else if (product) {
      alert(`Pago procesado para ${product.name} - $${product.price.toLocaleString()}`);
    }
    if (typeof onClose === "function") onClose();
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={{ margin: "0", color: "#ffffff" }}>
            {cartItems && cartItems.length > 0 ? "Pagar: Carrito" : `Pagar: ${product ? product.name : ""}`}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: "24px",
              cursor: "pointer",
              padding: "0",
            }}
          >
            ✕
          </button>
        </div>

        <div style={styles.content}>
          {cartItems && cartItems.length > 0 ? (
            <div style={{ marginBottom: 16 }}>
              <div style={styles.priceBox}>
                <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#999" }}>
                  Monto a pagar
                </p>
                <p style={{ margin: "0", fontSize: "28px", fontWeight: "700", color: "#ffffff" }}>
                  ${total.toLocaleString()}
                </p>
              </div>

              <div style={{ marginTop: 12, marginBottom: 12 }}>
                {cartItems.map((it) => (
                  <div key={it.product.id} style={{ display: "flex", justifyContent: "space-between", color: "#ddd", marginBottom: 6 }}>
                    <div>{it.product.name} x{it.quantity}</div>
                    <div>${(it.product.price * it.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={styles.priceBox}>
              <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#999" }}>
                Monto a pagar
              </p>
              <p style={{ margin: "0", fontSize: "28px", fontWeight: "700", color: "#ffffff" }}>
                ${product.price.toLocaleString()}
              </p>
            </div>
          )}

          <div style={styles.methodSelector}>
            <button
              onClick={() => setPaymentMethod("card")}
              style={{
                ...styles.methodBtn,
                ...(paymentMethod === "card" ? styles.methodBtnActive : {}),
              }}
            >
              💳 Tarjeta de Crédito
            </button>
            <button
              onClick={() => setPaymentMethod("bank")}
              style={{
                ...styles.methodBtn,
                ...(paymentMethod === "bank" ? styles.methodBtnActive : {}),
              }}
            >
              🏦 Transferencia Bancaria
            </button>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {paymentMethod === "card" && (
              <div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Número de Tarjeta</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Titular de la Tarjeta</label>
                  <input
                    type="text"
                    name="cardHolder"
                    placeholder="Nombre completo"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.formRow}>
                  <div style={{ ...styles.formGroup, flex: 1 }}>
                    <label style={styles.label}>Fecha de Vencimiento</label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/AA"
                      maxLength="5"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      style={styles.input}
                    />
                  </div>
                  <div style={{ ...styles.formGroup, flex: 1, marginLeft: "12px" }}>
                    <label style={styles.label}>CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      placeholder="123"
                      maxLength="3"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      style={styles.input}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "bank" && (
              <div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Banco</label>
                  <select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  >
                    <option value="">Selecciona un banco</option>
                    <option value="Bancolombia">Bancolombia</option>
                    <option value="Davivienda">Davivienda</option>
                    <option value="BBVA">BBVA</option>
                    <option value="Scotiabank">Scotiabank</option>
                    <option value="Itaú">Itaú</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Número de Cuenta</label>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Número de cuenta"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Titular de la Cuenta</label>
                  <input
                    type="text"
                    name="accountHolder"
                    placeholder="Nombre completo"
                    value={formData.accountHolder}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                  />
                </div>
              </div>
            )}

            <button type="submit" style={styles.submitBtn}>
              Confirmar Pago
            </button>
          </form>
        </div>
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#1a1a1a",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    maxHeight: "90vh",
    overflow: "auto",
    border: "1px solid #333333",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px",
    borderBottom: "1px solid #333333",
    backgroundColor: "#000000",
    borderRadius: "12px 12px 0 0",
  },
  content: {
    padding: "24px",
  },
  priceBox: {
    backgroundColor: "#2a2a2a",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px",
  },
  methodSelector: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px",
  },
  methodBtn: {
    flex: 1,
    padding: "12px 16px",
    border: "2px solid #333333",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  methodBtnActive: {
    backgroundColor: "#ffffff",
    color: "#000000",
    borderColor: "#ffffff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  formRow: {
    display: "flex",
    gap: "12px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#999",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #333333",
    backgroundColor: "#2a2a2a",
    color: "#ffffff",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "border-color 0.3s ease",
  },
  submitBtn: {
    padding: "14px 16px",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    transition: "all 0.3s ease",
    marginTop: "12px",
  },
};

export default PaymentModal;
